import React, { useState } from 'react'
import './Chat.css'
import Picker from 'emoji-picker-react';



export default function ChatButton({ handleSendMsg }) {
  const [msg,setMsg] = useState('');
  const [showPicker,setShowPicker]= useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMsg(prevInput => prevInput+event.emoji);
    // setShowPicker(false);

  }
  const sendChat = (event) => {
    event.preventDefault();
    console.log(msg)

    if (msg.length > 0) {
        handleSendMsg(msg);
        setMsg("");
    }
};
 

  return (
    <div className='chat-btn-container'>
    <div className='chat-form' >
    <img 
    className='emoji-icon'
    src='https://icons.getbootstrap.com/assets/icons/emoji-smile.svg'
    onClick={()=>setShowPicker((val)=>!val)} alt=''/>
    <form  onSubmit={(event) => sendChat(event)}>
    <input className='input-style'
    value={msg}
    onClick={()=>setShowPicker(false)}
    onChange={(e)=>setMsg(e.target.value)}
    />
    <button type="submit"><i class='bx bxs-send  msg-send-btn'></i></button>
    
    </form>
  <div className='emoji-box' style={{marginTop:"-560px",marginLeft:"-10px"}}>
    {showPicker && <Picker
          onEmojiClick={onEmojiClick}
      />}
      
      </div>
     
      
    </div>
  
    
    </div>
    
    
  )
}
