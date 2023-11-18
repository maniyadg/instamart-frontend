import React , {useState , useEffect, useRef} from 'react'
import axios from 'axios'
import { io } from "socket.io-client";
import Base from '../../Base/Base'
import './Chat.css'
import ChatContainer from './ChatContainer'
import { host } from '../../host';

function Chat() {

    const socket = useRef()    
    const [userData, setUserData] = useState([])
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [currentUser, setCurrentUser] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined);


    useEffect(() => {
        getAlluser()
        getcntUser()
    }, [])

    const getAlluser = async () => {
        try {
            const { data } = await axios.get(`${host}/api/getAlluser`)
            if (data && data.success) {
                setUserData(data?.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getcntUser = async () => {
        try {
            const { data } = await axios.get(`${host}/api/singleuser`)
            if (data && data.success) {
                setCurrentUser(data?.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (currentUser) {
          socket.current = io(`${host}`);
          socket.current.emit("add-user", currentUser._id);
        }
      }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        setCurrentChat(contact)
        console.log(currentChat)
      };

  return (
    <Base>

    <div className='chat-container'>
        <div className="chat-person-list" style={{ width: "35%" }}>
            <h1>Chat Persons</h1>
            <ul>
                {
                    userData.map((e , index) => (
                        <li 
                          key={e._id}
                          className={`person ${
                          index === currentSelected ? "selected" : ""
                        }`}
                        onClick={() => changeCurrentChat(index, e)}>
                            <img alt='img' src={e?.avatar ?? "https://cdn-icons-png.flaticon.com/512/21/21104.png"} style={{ width: "50px", height: "50px", borderRadius: "50%", border: "3px solid rgb(151, 71, 226)" }} />
                            <p>{e?.username}</p>
                        </li>
                    ))
                }
            </ul>
        </div>

        <div className='message-box' >
            <ChatContainer currentChat={currentChat} socket={socket} />
        </div>


    </div>




</Base>  )
}

export default Chat