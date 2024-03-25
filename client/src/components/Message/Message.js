import './Style/Message.css'

function Message(props) {
    const { text, userID, createdAt } = props.message;
    
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