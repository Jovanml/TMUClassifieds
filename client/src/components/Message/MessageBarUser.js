//Style
import './Style/MessageBarUser.css'

//Icon
import { UserCircleIcon } from '@heroicons/react/24/solid';

function MessageBarUser(props){

    //update the state of the page when a user selects a new conversation
    function changeChat(e){
        if (!props.selected){
            props.setMessageUserID({'id': e.currentTarget.id, 'name': e.currentTarget.querySelector('#messageBarUserName').innerText})
            props.setMessages([])
        }
    }

    return(
        <div className={props.selected ? 'messageBarUser selected' : 'messageBarUser'} id={props.user} onClick={(e) => changeChat(e)}>
            <UserCircleIcon className='messageBarUserImg' />
            <p id={"messageBarUserName"}>{props.name}</p>
        </div>
    )
}

export default MessageBarUser