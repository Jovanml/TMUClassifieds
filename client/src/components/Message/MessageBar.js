//Style
import './Style/MessageBar.css'

//Component
import MessageBarUser from './MessageBarUser'

//Icon
import { PencilSquareIcon } from '@heroicons/react/24/solid';

function MessageBar(props){

    //sorts the users convo object
    //this is done so the list of users in the message page will always be the same
    const usersConvos = Object.keys(props.usersConvos).sort().reduce(
        (obj, key) => {
            obj[key] = props.usersConvos[key];
            return obj;
        },
        {}
    );
    return(
        <aside className="userbar">
            <div id={"addChatHeader"}>
                <h1 id={"addChatText"}>Chats</h1>
                <button onClick={props.openModal} id={"addChatButton"}><PencilSquareIcon className='w-7 h-7'/></button>
            </div>
            {/* only return user list if they have a list to return*/ }
            {props.selectedConvo !== '' && (
                <div id={'messageBarUserList'}>
                    {Object.keys(usersConvos).map(user => {
                        if (user !== props.selectedConvo) {
                            return (<MessageBarUser key={user} user={user} name={usersConvos[user]['name']} selected={false} setMessageUserID={props.setMessageUserID} setMessages={props.setMessages} />)
                        } else {
                            return (<MessageBarUser key={user} user={user} name={usersConvos[user]['name']} selected={true} setMessageUserID={props.setMessageUserID} setMessages={props.setMessages} />)
                        }
                    })}
                </div>
            )}
        </aside>
    )
}

export default MessageBar