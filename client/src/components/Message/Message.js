//Style
import './Style/Message.css'

function Message(props) {
    //deconstructs message prop
    const { text, userID, createdAt } = props.message;

    //determin if the message is sent or recieved to update css
    const messageClass = userID === props.userID ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <div className='messageDiv'>
          <p className='messageText'>{text}</p>
          <p className='messageTime'>{createdAt}</p>
        </div>

      </div>
    </>)
  }

export default Message