import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgetPassword() {
  return (
    <div className='sign-container'>
    <div className='row'  style={{background:"red",margin:"0"}}>
      <div className='wrapper'>
      <div className='form-container signin'>
      <form action='#'>
      <h2>ForgetPassword</h2>
      <div className='form-group'>
      <input type='Email' required/>
      <i><FontAwesomeIcon icon={faEnvelope} /></i>
      
      <label for=''>email</label>
      </div>
      
      
      <button className='btn'>Verify</button>
      <div className='link'>
      <Link to="/signin" className='signin-link' style={{paddingLeft:"6rem"}}>Login</Link>
      </div>
      </form>
      </div>
      </div>
    </div>
    </div>
  )
}
