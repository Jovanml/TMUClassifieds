import './Style/AddChat.css'

import { UserCircleIcon } from '@heroicons/react/24/solid';

function AddChat(props){
    let userList = props.userList
    let convoListUsers = Object.keys(props.usersConvo)

    function newChat(e) {
        props.setUsersConvo({
            ...props.usersConvo,
            [e.currentTarget.id]: {
                'id': props.user['_id'] + e.currentTarget.id,
                'name': e.currentTarget.querySelector('#addUserUserName').innerText
            }
        })
        props.setMessageUserID({'id': e.currentTarget.id, 'name': e.currentTarget.querySelector('#addUserUserName').innerText})
        props.setMessages([])
        props.closeModal()
    }

    return(
    <div id='newChatUsers'>
        {userList && userList.map(listUser => {
            if (!convoListUsers.includes(listUser['_id'])){
                return(
                    <div key={listUser['_id']} id={listUser['_id']} className='singleAddChat' onClick={(e) => newChat(e)}>
                        <UserCircleIcon className='addChatUserImg' />
                        <p id={"addUserUserName"} className='addChatUserName'>{listUser['name']}</p>
                    </div>
                    )
            }
            return null;
        })}
    </div>
    )
}

export default AddChat