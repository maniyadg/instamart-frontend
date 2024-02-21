import React , {useEffect, useState} from 'react'
import Base from '../../Base/Base'
import './Profile.css'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Profile() {

  const { isAuthenticated,user} = useSelector((state)=>(state.authState))

  const [posts , setPosts] = useState(0)

  useEffect(() => {
    myposts()
  }, []);
  
 const myposts = async() => {
  const {data} = await axios.get('https://instamart-backend.onrender.com/api/myposts')
  if(data){
    setPosts(data.products.length)
  }
  console.log(data)
 }


  return (
    <Base>
    {
      isAuthenticated ?     <div className='profile-container'>
      <ul>
      <li className='p-list' ><img alt='img' src={ user.avatar ?? 'https://cdn-icons-png.flaticon.com/512/21/21104.png'}  style={{width:"150px",height:"150px",borderRadius:"50%",border:"3px solid rgb(151, 71, 226)"}}/></li> 
      <li className='p-list p-content'><span className='p-values'>{posts}</span><br/>Post</li>
      <li className='p-list p-content'><span className='p-values'>0</span><br/>Followers</li>
      <li className='p-list p-content'><span className='p-values'>0</span><br/>Following</li>
      </ul>
      <div className='profile-details' >
      <h3>{user.username}</h3>
     <p>{user.email}</p>
      <p>Innocent boy😁</p>
      </div>
      </div> : (<div className='profile-container'>
      <ul>
      <li className='p-list' ><img alt='img' src={  'https://cdn-icons-png.flaticon.com/512/21/21104.png'}  style={{width:"150px",height:"150px",borderRadius:"50%",border:"3px solid rgb(151, 71, 226)"}}/></li> 
      <li className='p-list p-content'><span className='p-values'>0</span><br/>Post</li>
      <li className='p-list p-content'><span className='p-values'>0</span><br/>Followers</li>
      <li className='p-list p-content'><span className='p-values'>0</span><br/>Following</li>
      </ul>
      <div className='profile-details' >
      <h3>username</h3>
     <p>email</p>
      <p>Innocent boy😁</p>
      </div>
      </div> )
    }

    </Base>
  )
}
