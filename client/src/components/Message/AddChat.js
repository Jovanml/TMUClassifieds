import avatar from './Images/Avatar.png'
import './Style/AddChat.css'

function AddChat(props){
    let userList = props.userList
    let convoListUsers = Object.keys(props.usersConvo)

    function newChat(e){
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
                        <img src={avatar} />
                        <p id={"addUserUserName"} className='addChatUserName'>{listUser['name']}</p>
                    </div>
                    )
            }
        })}
    </div>
    )
}

export default AddChat