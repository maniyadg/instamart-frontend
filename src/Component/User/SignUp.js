import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect , useRef, useState } from "react";
import FormData from 'form-data'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";


export default function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate("")
  const inputRef = useRef(null)
  const [userData , setUserData] = useState({
    username:'',
    email:'',
    password:''
  })
  const [avatar, setAvatar] = useState("");
 
  const [avatarPreview, setAvatarPreview] = useState("https://cdn-icons-png.flaticon.com/512/21/21104.png");

  const { loading, error, isAuthenticated } = useSelector(state => state.authState)


  const onChange = (e) => {
    if(e.target.name === 'avatar') {
       const reader = new FileReader();
       reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result);
                console.log(avatarPreview)
                setAvatar(e.target.files[0])
                console.log(avatar)
            }
       }


       reader.readAsDataURL(e.target.files[0])
    }    setUserData({...userData , [e.target.name] : e.target.value})

    
}

const handleImageClick = ()=>{
  inputRef.current.click()
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', userData.username)
    formData.append('email', userData.email)
    formData.append('password', userData.password)
    formData.append('avatar', avatar);

    dispatch(register(formData))
  };

  useEffect(()=>{
    if(isAuthenticated) {
        navigate('/');
        return
    }

},[error, isAuthenticated, dispatch, navigate])

  return (
    <div className="sign-container">
      <div className="row">
        <div className="wrapper">
          <div className="form-container signup" style={{ maxWidth: "28rem" }}>

            <form action="#" onSubmit={handleSubmit} encType='multipart/form-data'>
             <h2>Register</h2>
             <div className='d-flex align-items-center '>
                
                    <figure className='avatar mr-3 item-rtl' onClick={handleImageClick}>
                        <img
                            src={avatarPreview}
                            alt='Avatar'
                            style={{width:"100px",height:"100px",position:"relative",top:"20px",left:"6rem",border:"2px solid black",cursor:"pointer",borderRadius:'50%'}}
                            
                        />
                    </figure>
                
                <div className='custom-file'>
                
                    <input
                        type='file'
                        name='avatar'
                        onChange={ onChange }
                        accept="image/*"
                        className='custom-file-input'
                        id='customFile'
                        style={{display:"none"}}
                        ref={inputRef}
                    />
                    
                </div>
            </div>
              <div className="form-group">
              <input
              type="username"
              required
              name="username"
              onChange={onChange}
            />
                <i>
                  <FontAwesomeIcon icon={faUser} />
                </i>

                <label for="">Username</label>
              </div>
              <div className="form-group">
              <input
              type="Email"
              required
              name="email"
              onChange={onChange}
            />
                <i>
                  <FontAwesomeIcon icon={faEnvelope} />
                </i>

                <label for="">email</label>
              </div>

              <div className="form-group">
              <input
              required
              type="password"
              name="password"
              onChange={onChange}
            />
                <i>
                  <FontAwesomeIcon icon={faLock} />
                </i>
                <label for="">password</label>
              </div>

              <button className="btn" type="submit" >
                Register
              </button>
              
              <ToastContainer />
              
              <div className="login-link">
                <p>
                  Already have an account?
                  <Link to="/" className="signin-link">
                    Login
                  </Link>
                </p>
              </div>

            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}


