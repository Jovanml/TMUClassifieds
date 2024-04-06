import React, { useRef, useState, useEffect } from 'react'

import './Style/MessagePage.css'

import Message from './Message'
import MessageBar from './MessageBar'
import AddChat from './AddChat'

import { socket } from './socket'

import Modal from 'react-modal'

import { UserCircleIcon } from '@heroicons/react/24/solid';

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

function MessagePage({ user, usersConvo, messageUserID, setMessageUserID, statePass, setUsersConvo }) {

    //conversation ID
    const messageDBID = usersConvo[messageUserID]['id']

    //name of current user in convo
    const messageName = usersConvo[messageUserID]['name']

    //list of messages
    const [messages, setMessages] = useState([])

    //state to flip if rerender required
    const [messageRef, setMessageRef] = useState(false)

    //list of users used for add chat modal
    const [userList, setUserList] = useState([])

    //if modal is open or not
    const [open, setOpen] = useState(false)

    //synchronus way of checking if modal is open to stop unecessary requests
    const isOpen = useRef(false)

    //current message in message input
    const [msg, setMsg] = useState('')

    //dummy ref used to auto scroll when message is sent
    const dummy = useRef();

    //modal styles
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '10vw',
        maxHeight: '70vh',
        minWidth: '20vw'
      },
    };

    //opens the modsl
    const openModal = () => {
      isOpen.current = true
      setOpen(true)
    }

    //closes the modal
    const closeModal = () => {
      isOpen.current = false
      setOpen(false)
    }

    //updates messages when server emits a new message
    function messageRecieved(value){
      setMessages([...messages, value])
      setMessageRef(!messageRef)
    }

    //listens for new message and adds it to the message state when recieved
    socket.on('message', messageRecieved)

    //emits which chatroom the user is currently in
    socket.emit('chatRoom', {"convoID": messageDBID, 'userID': user['_id']})

    //use effect that gets a list of all users for the add chat modal
    //runs when modal is opened
    useEffect(() =>{
      async function getUserList(){
        fetch(`${process.env.REACT_APP_BACKEND_URL}/get/users?id=` + user['_id'], {
          method: 'GET'
        })
        .then(response => {
          if (response.status === 200){
            response.json().then((data) => {
              setUserList(data)
            })
          }
        })
        .catch(err => {
            console.error(err)
        })
      }

      if(isOpen.current){
        getUserList()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    //grabs last 25 messages from the db when a new convo is selected or a new message is recieved
    useEffect(() => {
      async function fetchData(){
        fetch(`${process.env.REACT_APP_BACKEND_URL}/get/messages?limit=25&id=` + messageDBID, {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageRef, statePass])

    //handles sending a message
    const sendMessage = async (e) => {
      //sends the message to the db
      async function postData(){
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post/messages`, {
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
          //updates states and emits to the server that a message was sent
          //scrolls the page down to the latest message of not already there
          setMsg('')
          setMessageRef(!messageRef)
          socket.emit('message', {"convoID": messageDBID, 'text': msg, 'userID': user['_id']})
          dummy.current.scrollIntoView({ behavior: 'smooth' })
        })
        .catch(err => {
            console.error(err)
        })
      }
      
      e.preventDefault();
      //updates message state before posting to db so user sees update immediately
      setMessages([...messages,
        {
        'text': msg,
        'convoID': messageDBID,
        'userID': user['_id'],
      }])
      postData()
    }

    //handles when a user presses enter in the message input textbox
    const enterPress = (e) => {
      let key = window.event.keyCode;
      if (key === 13) {
        e.preventDefault()
        if (msg !== ''){
          sendMessage(e)
        }
      }
    }

    return (
      <>
        <Modal isOpen={open} onRequestClose={closeModal} style={customStyles} contentLabel="Add Chat" ariaHideApp={false}>
          <div className='addUserList'>
            <h1 id='addChatHeader'>Add Chat</h1>
                    <AddChat user={user} userList={userList} usersConvo={usersConvo} setMessageUserID={setMessageUserID} closeModal={closeModal} setMessages={setMessages} setUsersConvo={setUsersConvo} />
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