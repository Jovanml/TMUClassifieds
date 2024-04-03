import React, { useEffect, useState, useContext } from 'react'

import './Style/MessageComponent.css'

import MessagePage from './MessagePage'
import MessageBar from './MessageBar'

import { socket } from './socket'
import { useLocation } from 'react-router-dom'

import { GlobalContext } from '../../contexts/GlobalContext';

function MessageController() {

    const { state } = useContext(GlobalContext);
    const user = state.user;

    socket.disconnect()
    socket.connect()

    const { search } = useLocation();
    const query = new URLSearchParams(search)

    const messageUser = query.get("messageUser") === null ? '' : query.get("messageUser")
    const messageUsername = query.get("messageUsername") === null ? '' : query.get("messageUsername")

    const [usersConvo, setUsersConvo] = useState(user['conversations'])

    const [messageUserID, setMessageUserID] = useState(messageUser === '' ? Object.keys(usersConvo).length > 0 ? { 'id': Object.keys(usersConvo)[0], 'name': usersConvo[Object.keys(usersConvo)[0]]['name'] } : { 'id': '', 'name': '' } : { 'id': messageUser, 'name': messageUsername })
    const mID = messageUserID['id']
    const mN = messageUserID['name']

    useEffect(() => {
        async function fetchConvos() {
            fetch('http://127.0.0.1:5000/get/user?id=' + user['_id'] + '&field=conversations', {
                method: 'GET'
            }).then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setUsersConvo(data['conversations'])
                    })
                }
            })
            .catch(err => {
                console.error(err)
            })
        }
        fetchConvos()
    }, [messageUserID])

    if (!Object.keys(usersConvo).includes(mID)) {
        setUsersConvo({
            ...usersConvo,
            [mID]: { 'id': user['_id'] + mID, 'name': mN }
        })
        fetch('http://127.0.0.1:5000/add/user/conversation', {
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
    }

    if (messageUserID === '') {
        return (
            <div className='MessageComponent'>
                <MessageBar setMessageUserID={setMessageUserID} usersConvos={usersConvo} selectedConvo={messageUserID} />
            </div>
        )
    } else {
        return (
            <div className='MessageComponent'>
                <MessagePage user={user} usersConvo={usersConvo} messageUserID={mID} setMessageUserID={setMessageUserID} statePass={messageUserID} />
            </div>
        )
    }
}

export default MessageController