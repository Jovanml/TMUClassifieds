import re
from unicodedata import category
from flask import Flask, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import base64
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO,emit
import datetime
import os
from dotenv import load_dotenv
from helpers import verify_id_token
import json

#how to start the app
#flask --app routes --debug run
#link to download the json of the postman requests i used
#https://api.postman.com/collections/33183912-40bc2e75-e994-4456-bf30-897602d92c7e?access_key=PMAT-01HSVFHWMKWW82JA8KB0NMECA9
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'secret!'
uri = f'mongodb+srv://theowilson2014:{os.getenv("MONGODB_PASSWORD")}@{os.getenv("MONGODB_ADDRESS")}/?retryWrites=true&w=majority&appName={os.getenv("Cluster0Test")}'
socketio = SocketIO(app, cors_allowed_origins="*")
load_dotenv()

if __name__ == '__main__':
    socketio.run(app)

##################################################
#Users Users
##################################################
@app.get("/get/users")
def getAllUsers():
    userID = request.args.get('id')
    query = {'_id': {'$ne': ObjectId(userID)}}
    get = {'_id': 1, 'name': 1}
    result = False
    returnData = []
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        tempData = collection.find(query, get)
        for row in tempData:
            result = True
            row['_id'] = str(row['_id'])
            returnData.append(row)
        if not result:
            return "No Data", 204
        return returnData, 200
    except Exception as e:
        print(e)
        return "Error while processing your request", 500

@app.get("/get/user")
def getUserData():
    field = None
    oIDFields = ["blocked_users", "bought", "posts"]
    userID = request.args.get('id')
    query = {"_id": ObjectId(userID)}
    get = {}
    if ("field" in request.args.keys()):
        field = request.args.get('field')
        get[field] = 1
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        tempData = collection.find_one(query, get)
        print(tempData)
        if tempData == None:
            return "No data matching this criteria", 204
        print(tempData)
        tempData["_id"] = str(tempData["_id"])
        print(tempData)
        for f in oIDFields:
            if (f in tempData.keys()):
                for i in range(len(tempData[f])):
                    tempData[f][i] = str(tempData[f][i])
        print(tempData)
        return tempData, 200
    except Exception as e:
        print(e)
        return "Error while processing your request", 500

@app.get("/get/user/posts")
def getUserPostsData():
    allowedFields = ["bought", "posts"]
    returnData = []
    field = None
    userID = request.args.get('id')
    query = {"_id": ObjectId(userID)}
    get = {"name": 1}
    if ("field" not in request.args.keys()):
        return "Missing Field Parameter", 400
    field = request.args.get('field')
    if (field not in allowedFields):
        return "Invalid Field Lookup", 401
    get[field] = 1
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        tempData = collection.find_one(query, get)
        if tempData == None:
            return "No data matching this criteria", 204
        postQuery = {"$or": []}
        if len(tempData[field]) == 0:
            return "No Data", 204
        for i in range(len(tempData[field])):
            postQuery["$or"].append({"_id": tempData[field][i]})
        collection = db["Posts"]
        postData = collection.find(postQuery)
        for row in postData:
            row["_id"] = str(row["_id"])
            row["owner"] = str(row["owner"])
            row["name"] = tempData["name"]
            returnData.append(row)        
        return returnData, 200
    except Exception as e:
        print(e)
        return "Error while processing your request", 500

@app.post("/create/user")
def createUser():
    formData = request.form
    record = {"_id": ObjectId(), "name": formData["name"], "email": formData["email"], "admin": "false", "banned": "false", "blocked_users": [], "bought": [], "posts": [], "conversations": {}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        collection.insert_one(record)
        return "Success", 201
    except Exception as e:
        print(e)
        return e, 500
    
@app.put("/update/user")
def updateUserData():
    jsonData = request.json
    userID = jsonData['id']
    query = {"_id": ObjectId(userID)}
    fields = jsonData['fields']
    setDict = {}
    for obj in fields:
        setDict[obj['field']] = obj['value']
    update = {"$set": setDict}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500
    
@app.put("/ban/user")
def banUser():
    jsonData = request.json
    userID = jsonData['id']
    query = {"_id": ObjectId(userID)}
    update = {"$set": {"banned": "true"}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        collection.update_one(query, update)
        collection = db["Posts"]
        query = {"owner": ObjectId(userID), "bought": "false"}
        collection.update_many(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500

@app.put("/unban/user")
def unbanUser():
    jsonData = request.json
    userID = jsonData['id']
    query = {"_id": ObjectId(userID)}
    update = {"$set": {"banned": "false"}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        collection.update_one(query, update)
        collection = db["Posts"]
        query = {"owner": ObjectId(userID), "banned": "true"}
        collection.update_many(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500

@app.put("/add/user/conversation")
def addUserConvo():
    jsonData = request.json
    userID = jsonData['id']
    userName = jsonData['name']
    messageUserID = jsonData['messageUserID']
    messageUserName = jsonData['messageUserName']
    convoID = jsonData['convoID']
    query = {"_id": ObjectId(userID)}
    update = {"$set": {"conversations." + messageUserID : {"id": convoID, "name": messageUserName}}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        collection.update_one(query, update)
        query = {"_id": ObjectId(messageUserID)}
        update = {"$set": {"conversations." + userID : {"id": convoID, "name": userName}}}
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500

@app.put("/update/user/posts")
def updateUserPostsData():
    jsonData = request.json
    field = None
    userID = jsonData['id']
    query = {"_id": ObjectId(userID)}
    if ("field" not in jsonData.keys()):
        return "Missing Field Parameter", 400
    field = jsonData['field']
    value = jsonData['value']
    update = {"$push": {field: ObjectId(value)}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500

@app.delete("/delete/user/<id>")
def deleteUser(id):
    query = {"_id": ObjectId(id)}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        collection.delete_one(query)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500
    
##################################################
#Users Posts
##################################################

@app.get("/get/posts")
def getData():
    #limit = int(request.args.get('limit'))
    #offset = int(request.args.get('offset'))
    location = request.args.get('location')
    priceLess = request.args.get('priceLess')
    priceMore = request.args.get('priceMore')
    search = request.args.get('search')
    category = request.args.get('category')
    returnData = []
    query = {"bought": "false", "banned": "false"}
    if location is not None:
        query["location"] = location
    if category is not None:
        query["type"] = category
    if search is not None:
        query["$or"] = [{'title':  {'$regex': f'{search}'}}, {'description':  {'$regex': f'{search}'}}]
    if priceLess is not None and priceMore is None:
        query["price"] = {"$lte": float(priceLess)}
    elif priceLess is None and priceMore is not None:
        query["price"] = {"$gte": float(priceMore)}
    elif priceLess is not None and priceMore is not None:
        query["$and"] = [{"price": {"$gte": float(priceMore)}}, {"price": {"$lte": float(priceLess)}}]
    results = False
    print(query)
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Posts"]
        tempData = collection.find(query)#.skip(offset).limit(limit)
        for row in tempData:
            results = True
            row["_id"] = str(row["_id"])
            query = {"_id": ObjectId(str(row["owner"]))}
            get = {"name": 1}
            collection = db["Users"]
            userData = collection.find_one(query, get)
            row["ownerID"] = str(row["owner"])
            row["owner"] = userData["name"]
            returnData.append(row)
        if not results:
            return "No Data", 204
        return returnData, 200
    except Exception as e:
        print(e)
        return e, 500

@app.post("/create/posts")
def createData():
    formData = request.form
    postID = ObjectId()
    record = {"_id": postID, "type": formData["postType"], "title": formData["title"], "description": formData['desc'], "banned": "false", "bought": "false", "buyer": "", "price": float(formData["price"]), "picture": formData['picture'], "owner": ObjectId(formData["owner"]), "location": formData["location"]}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Posts"]
        collection.insert_one(record)
        collection = db["Users"]
        query = {"_id": ObjectId(formData["owner"])}
        update = {"$push": {"posts": ObjectId(postID)}}
        collection.update_one(query, update)
        return "Success", 201
    except Exception as e:
        print(e)
        return e, 500

#test endpoint for file fields
@app.post("/temp/picture/test")
def testPic():
    id = request.form['id']
    file = request.files['file']
    print(file.mimetype)
    return 'a', 200
    
@app.put("/update/posts")
def updateData():
    jsonData = request.json
    query = {"_id": ObjectId(jsonData['id'])}
    fields = jsonData['fields']
    setDict = {}
    for obj in fields:
        setDict[obj['field']] = obj['value']
    update = {"$set": setDict}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Posts"]
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500
    
@app.put("/ban/posts")
def banPost():
    jsonData = request.json
    query = {"_id": ObjectId(jsonData['id'])}
    update = {"$set": {'banned': 'true'}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Posts"]
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500

@app.put("/unban/posts")
def unbanPost():
    jsonData = request.json
    query = {"_id": ObjectId(jsonData['id'])}
    update = {"$set": {'banned': 'false'}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Posts"]
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500
    
@app.put("/bought/posts")
def boughtPost():
    jsonData = request.json
    userID = jsonData["user"]
    postID = jsonData["post"]
    query = {"_id": ObjectId(postID)}
    update = {"$set": {"bought": "true", "buyer": ObjectId(userID)}}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Posts"]
        collection.update_one(query, update)
        collection = db["Users"]
        query = {"_id": ObjectId(userID)}
        update = {"$push": {"bought": ObjectId(postID)}}
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500

@app.delete("/delete/posts/<id>")
def deleteData(id):
    query = {"_id": ObjectId(id)}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Posts"]
        tempData = collection.find_one(query, {'owner': 1})
        print(str(tempData['owner']))
        collection.delete_one(query)
        collection = db["Users"]        
        query = {"_id": ObjectId(str(tempData['owner']))}
        update = {"$pull": {"posts": ObjectId(id)}}
        collection.update_one(query, update)
        return "Success", 200
    except Exception as e:
        print(e)
        return e, 500

##################################################
#Messages calls
##################################################
@app.get("/get/messages")
def getMessages():
    limit = int(request.args.get('limit'))
    id = request.args.get('id')
    results = False
    query = {"convoID": id}
    returnData = []
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Messages"]
        tempData = collection.find(query).limit(limit).sort("createdAt", 1)
        for row in tempData:
            results = True
            row['_id'] = str(row['_id'])
            row['userID'] = str(row['userID'])
            row['createdAt'] = row['createdAt'].strftime("%m/%d/%Y %H:%M:%S")
            returnData.append(row)
        if not results:
            return "No Data", 204
        return returnData, 200
    except Exception as e:
        print(e)
        return e, 500

@app.post("/post/messages")
def postMessage():
    formData = request.form
    print(formData)
    messageID = ObjectId()
    record = {"_id": messageID, 'text': formData['text'], 'userID': ObjectId(formData['userID']), 'convoID': formData['convoID'], 'createdAt': datetime.datetime.now(tz=datetime.timezone.utc)}
    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Messages"]
        collection.insert_one(record)
        return "Success", 201
    except Exception as e:
        print(e)
        return e, 500

@app.post("/login")
def login():
    data = request.json
    if "userToken" not in data:
        return "Invalid Data", 400

    user_token = data["userToken"]
    decoded_token = verify_id_token(user_token)

    if decoded_token is None:
            return "Invalid Token", 400
    uid = decoded_token['uid']

    try:
        client = MongoClient(uri, server_api=ServerApi('1'))
        db = client["TestCPS630"]
        collection = db["Users"]
        user = collection.find_one({'googleID': uid})

        if user is None:
            user = {"_id": ObjectId(), "name": decoded_token["name"], "email": decoded_token["email"], "googleID": uid, "admin": "false", "banned": "false", "blocked_users": [], "bought": [], "posts": [], "conversations": {}}
            result = collection.insert_one(user)
            if result.acknowledged == False:
                return "Operation Failed", 500
        
        return json.dumps(user, default=str), 200
    except Exception as e:
        print(e)
        return e, 500
 

##################################################
#sockets
##################################################
##################################################
#socket state
##################################################
chatrooms = {}

##################################################
#socket listeners
##################################################
@socketio.on("connect")
def connected():
    print(request.sid)
    print("client has connected")

@socketio.on("chatRoom")
def chatroom(data):
    convoID = data['convoID']
    id = data['userID']
    if convoID not in chatrooms:
        chatrooms[convoID] = [request.sid]
    else:
        if request.sid not in chatrooms[convoID]:
            chatrooms[convoID].append(request.sid)
    print(chatrooms)

@socketio.on("message")
def chatroom(data):
    convoID = data['convoID']
    for user in chatrooms[convoID]:
        if user != request.sid:
            emit('message', data, room=user)

@socketio.on_error_default
def chat_error_handler(e):
    print('An error has occurred: ' + str(e))

@socketio.on("disconnect")
def disconnected():
    print("user disconnected")
    for chatroom in chatrooms:
        if request.sid in chatrooms[chatroom]:
            chatrooms[chatroom].remove(request.sid)
            break