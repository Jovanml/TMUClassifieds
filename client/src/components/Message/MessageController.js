//import react hooks
import React, { useEffect, useState, useContext } from 'react'

//import css
import './Style/MessageComponent.css'

//import child components
import MessagePage from './MessagePage'
import MessageBar from './MessageBar'

//import sockets
import { socket } from './socket'

//import routing to read url query params
import { useLocation } from 'react-router-dom'

//import global context to get user state
import { GlobalContext } from '../../contexts/GlobalContext';

//import header
import Header from '../header/Header'

function MessageController() {

    //obtain user state
    const { state } = useContext(GlobalContext);
    const user = state.user;

    //connect to socket
    socket.disconnect()
    socket.connect()

    //get query params
    const { search } = useLocation();
    const query = new URLSearchParams(search)
    const messageUser = query.get("messageUser") === null ? '' : query.get("messageUser")
    const messageUsername = query.get("messageUsername") === null ? '' : query.get("messageUsername")

    //set states for message page
    const [usersConvo, setUsersConvo] = useState(user['conversations'])
    const [messageUserID, setMessageUserID] = useState(messageUser === '' ? Object.keys(usersConvo).length > 0 ? { 'id': Object.keys(usersConvo)[0], 'name': usersConvo[Object.keys(usersConvo)[0]]['name'] } : { 'id': '', 'name': '' } : { 'id': messageUser, 'name': messageUsername })

    const mID = messageUserID['id']
    const mN = messageUserID['name']

    //check if current convo exsists locally
    //if it doesnt update the convo state
    if (!Object.keys(usersConvo).includes(mID)) {
        setUsersConvo({
            ...usersConvo,
            [mID]: { 'id': user['_id'] + mID, 'name': mN }
        })
    }

    //use effect hook to run every time a new conversation is selected
    useEffect(() => {
        async function fetchConvos() {
            //fetch current convos from user object in the db
            fetch(`${process.env.REACT_APP_BACKEND_URL}/get/user?id=` + user['_id'] + '&field=conversations', {
                method: 'GET'
            }).then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        //check if convoseration exsists
                        if (!Object.keys(data['conversations']).includes(mID)) {
                            //if it doesnt update local state and add to user object in the db
                            setUsersConvo({
                                ...data['conversations'],
                                [mID]: { 'id': user['_id'] + mID, 'name': mN }
                            })
                            fetch(`${process.env.REACT_APP_BACKEND_URL}/add/user/conversation`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    'id': user['_id'],
                                    'name': user['name'],
                                    'convoID': user['_id'] + mID,
                                    'messageUserID': mID,
                                    'messageUserName': mN
                                })
                            })
                                .catch(err => {
                                    console.error(err)
                                })
                        } else {
                            //if it does update convos with the convo state in the db
                            setUsersConvo(data['conversations'])
                        }
                    })
                }
            })
                .catch(err => {
                    console.error(err)
                })
        }

        fetchConvos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageUserID])

    //if user has no convos dont load message page only load side bar with ability to add new convos
    if (Object.keys(usersConvo).length === 0) {
        return (
            <>
                <Header showSearch={false} />
                <div className='MessageComponent'>
                    <MessageBar setMessageUserID={setMessageUserID} usersConvos={usersConvo} setUsersConvo={setUsersConvo} />
                </div>
            </>
        )
        //else return the message page
    } else {
        return (
            <>
                <Header showSearch={false} />
                <div className='MessageComponent'>
                    <MessagePage user={user} usersConvo={usersConvo} messageUserID={mID} setMessageUserID={setMessageUserID} statePass={messageUserID} setUsersConvo={setUsersConvo} />
                </div>
            </>
        )
    }
}

export default MessageController