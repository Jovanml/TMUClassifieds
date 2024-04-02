import React, { useRef, useState, useEffect } from 'react'

import './Style/MessagePage.css'

import Message from './Message'
import MessageBar from './MessageBar'
import AddChat from './AddChat'

import { socket } from './socket'

import Modal from 'react-modal'

import { UserCircleIcon } from '@heroicons/react/24/solid';

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

function MessagePage({user, usersConvo, messageUserID, setMessageUserID, statePass}){

    const messageDBID = usersConvo[messageUserID]['id']
    const messageName = usersConvo[messageUserID]['name']
    const [messages, setMessages] = useState([])
    const [messageRef, setMessageRef] = useState(false)
    const [userList, setUserList] = useState([])
    const [open, setOpen] = useState(false)
    const isOpen = useRef(false)
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '10vw',
        maxHeight: '70vh'
      },
    };

    const openModal = () => {
      isOpen.current = true
      setOpen(true)
    }

    const closeModal = () => {
      isOpen.current = false
      setOpen(false)
    }

    function messageRecieved(value){
      setMessages([...messages, value])
      setMessageRef(!messageRef)
    }

    socket.on('message', messageRecieved)

    socket.emit('chatRoom', {"convoID": messageDBID, 'userID': user['_id']})

    useEffect(() =>{
      async function getUserList(){
        fetch('http://127.0.0.1:5000/get/users?id=' + user['_id'], {
          method: 'GET'
        })
        .then(response => {
          if (response.status === 200){
            response.json().then((data) => {
              setUserList(data)
            })
          }
        })
        .catch(e)(err => {
            console.error(err)
        })
      }

      if(isOpen.current){
        getUserList()
      }
    }, [open])

    useEffect(() => {
      async function fetchData(){
        fetch('http://127.0.0.1:5000/get/messages?limit=25&id=' + messageDBID, {
          method: 'GET'
        })
        .then(response => {
          if (response.status === 200){
            response.json().then((data) => {
              setMessages(data)
            })
          } else {
            setMessages([])
          }
        })
        .catch(err => {
            console.error(err)
        })
      }
      fetchData()
    }, [messageRef, statePass])

    const dummy = useRef();

    const [msg, setMsg] = useState('')

    const sendMessage = async (e) => {
      async function postData(){
        fetch('http://127.0.0.1:5000/post/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'text': msg,
            'convoID': messageDBID,
            'userID': user['_id']
          })
        }).then(() => {
          setMsg('')
          setMessageRef(!messageRef)
          socket.emit('message', {"convoID": messageDBID, 'text': msg, 'userID': user['_id']})
          dummy.current.scrollIntoView({ behavior: 'smooth' })
        })
        .catch(e)(err => {
            console.error(err)
        })
      }
      
      e.preventDefault();
      setMessages([...messages,
        {
        'text': msg,
        'convoID': messageDBID,
        'userID': user['_id'],
      }])
      postData()
    }

    const enterPress = (e) => {
      let key = window.event.keyCode;
      if (key === 13) {
        e.preventDefault()
        if (msg !== ''){
          sendMessage()
        }
      }
    }

    return (
      <>
        <Modal isOpen={open} onRequestClose={closeModal} style={customStyles} contentLabel="Add Chat" ariaHideApp={false}>
          <div className='addUserList'>
            <h1 id='addChatHeader'>Add Chat</h1>
            <AddChat user={user} userList={userList} usersConvo={usersConvo} setMessageUserID={setMessageUserID} closeModal={closeModal} setMessages={setMessages}/>
          </div>
        </Modal>
        <MessageBar convoIDUpdate={setMessageUserID} usersConvos={usersConvo} selectedConvo={messageUserID} openModal={openModal} setMessageUserID={setMessageUserID} setMessages={setMessages}/>
        <div className='messagePage'>

          <div className='chatHeader'>
            <UserCircleIcon className='chatHeaderImg' />&emsp;
            <h1>{messageName}</h1>
          </div>

          <main className='messageArea'>

            {messages && messages.map(msg => <Message key={msg["_id"]} message={msg} userID={user['_id']} />)}

            <span ref={dummy}></span>

          </main>

          <form className='messageSubmit' onSubmit={sendMessage}>

            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={"Message " + messageName} id={"inputMessage"} onKeyDown={(e) => enterPress(e)}/>

                    <button type="submit" disabled={!msg} id={'sendButton'}><PaperAirplaneIcon className='submitButtonIcon' /></button>

          </form>
        </div>
      </>
    )

}

export default MessagePage