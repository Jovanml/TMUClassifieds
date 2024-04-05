import React, { useEffect, useState, useContext } from 'react'

import './Style/MessageComponent.css'

import MessagePage from './MessagePage'
import MessageBar from './MessageBar'

import { socket } from './socket'
import { useLocation } from 'react-router-dom'

import { GlobalContext } from '../../contexts/GlobalContext';

import Header from '../Header/Header'

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
            fetch(`${process.env.REACT_APP_BACKEND_URL}/get/user?id=` + user['_id'] + '&field=conversations', {
                method: 'GET'
            }).then(response => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        if (!Object.keys(data['conversations']).includes(mID)) {
                            setUsersConvo({
                                ...usersConvo,
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

    if (messageUserID === '') {
        return (
            <>
                <Header showSearch={false} />
                <div className='MessageComponent'>
                    <MessageBar setMessageUserID={setMessageUserID} usersConvos={usersConvo} setUsersConvo={setUsersConvo}/>
                </div>
            </>
        )
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