import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Verify() {
  return (
    <div className='sign-container'>
    <div className='row'>
      <div className='wrapper'>
      <div className='form-container signin'>
      <form action='#'>
      <h2>Verify</h2>
      <div className='form-group'>
      <input type='password' required/>
      <i><FontAwesomeIcon icon={faLock} /></i>
      
      <label for=''>password</label>
      </div>
      <div className='form-group'>
      <input type='password' required/>
      <i><FontAwesomeIcon icon={faLock} /></i>
      <label for=''>confirm password</label>
       </div>
      <button className='btn'>Confirm</button>
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
