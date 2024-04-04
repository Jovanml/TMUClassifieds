import './Style/MessageBar.css'
import MessageBarUser from './MessageBarUser'
import addChat from '../../assets/addChat.svg'

function MessageBar(props){

    const usersConvos = Object.keys(props.usersConvos).sort().reduce(
        (obj, key) => {
            obj[key] = props.usersConvos[key];
            return obj;
        },
        {}
    );

    if (props.selectedConvo === ''){
        return(
            <aside className="userbar">
                <div id={"addChatHeader"}>
                    <h1 id={"addChatText"}>Chats</h1>
                    <button onClick={props.openModal} id={"addChatButton"}><img src={addChat} id='addChatImg' /></button>
                </div>
            </aside>
        )
    } else {
        return(
            <aside className="userbar">
                <div id={"addChatHeader"}>
                    <h1 id={"addChatText"}>Chats</h1>
                    <button onClick={props.openModal} id={"addChatButton"}><img src={addChat} id='addChatImg' /></button>
                </div>
                <div id={'messageBarUserList'}>
                    {Object.keys(usersConvos).map(user => {
                        if (user !== props.selectedConvo){
                            return(<MessageBarUser key={user} user={user} name={usersConvos[user]['name']} selected={false} setMessageUserID={props.setMessageUserID} setMessages={props.setMessages}/>)
                        } else {
                            return(<MessageBarUser key={user} user={user} name={usersConvos[user]['name']} selected={true} setMessageUserID={props.setMessageUserID} setMessages={props.setMessages}/>)
                        }
                    })}
                </div>
            </aside>
        )
    }
}

export default MessageBar