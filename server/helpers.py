import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(credential=cred)

def verify_id_token(token):
    try:
        decoded_token = auth.verify_id_token(token)
        print(decoded_token)
        return decoded_token
    except auth.InvalidIdTokenError:
        return None