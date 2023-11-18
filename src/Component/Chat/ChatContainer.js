import React , {useState,useEffect,useRef} from 'react'
import ChatInput from './ChatInput'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { useSelector } from 'react-redux';
import { host } from '../../host';
function ChatContainer({socket,currentChat}) {
    const { isAuthenticated,user} = useSelector((state)=>(state.authState))


    const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect( () => {
    getChat()
  }, [currentChat]);
  console.log(currentChat);


  const getChat = async () => {
    try{
        // const data = await axios.get(`${host}/api/singleuser',{withCredentials: true});
        const userdetails = user
         console.log(userdetails)
        const response = await axios.post(`${host}/api/messages/getmsg`, {
          from: user._id,
          to: currentChat._id,
        });
        setMessages(response.data);
    }catch(error){
        console.log('Error: ', error);
    }
}

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await axios.get(`${host}/api/singleuser`,{withCredentials: true})._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    // const data = await axios.get(`${host}/api/singleuser',{withCredentials: true});
    // const user = data.data.username
    console.log(msg)
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      msg,
    });
    await axios.post(`${host}/api/messages/addmsg`, {
      from: user._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages)

    return (
        <>
        {currentChat === undefined ? (
            <div className="chat-display" style={{ width: "65%" }}>
                <h1>Welcome</h1>
        </div>          ) : 
           ( 
            <>
           <div className="chat-header">
           <div className="user-details">
             <div className="avatar">
               <img
               className="profile"
               src={ currentChat.avatar ?? 'https://cdn-icons-png.flaticon.com/512/21/21104.png'}                  alt=""
               />
             </div>
             <div className="username">
               <h3>{currentChat.username}</h3>
             </div>
           </div>
         </div>
                <div className="chat-messages" >
                {
                    messages.map((message) => (
                    <div ref={scrollRef} key={uuidv4()}>
                    <div
                          className={`message ${
                            message.fromSelf ? "sended" : "recieved"
                          }`}
                        >
                          <div className="content ">
                            <p >{message.message}</p>
                          </div>
                        </div>
                      </div>
           ))} 
                </div>
                <ChatInput handleSendMsg={handleSendMsg} />
            </>
            )
        }
        </>
    )
}

export default ChatContainer