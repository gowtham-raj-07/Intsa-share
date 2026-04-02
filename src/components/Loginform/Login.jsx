import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './login.css';
const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [showsubmiterror,setsubmiterror]=useState(false);
  const [errormssg,seterrormssg]=useState('');
  const navigate=useNavigate();

  const onChangeUsername = (event) => {setUsername(event.target.value);};
  const onChangePassword = (event) => {setPassword(event.target.value);};

  const onsubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token',jwtToken,{ expires :60});
    navigate("/",{replace:true});
  };
  console.log(Cookies.get('jwt_token'))

  const onsubmitFailure = errormssg => {
    setsubmiterror(true);
    seterrormssg(errormssg);
  }

  

  const submitform = async event => {
    event.preventDefault();
    const userDeatils = {username,password};
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDeatils)
    };
    const response = await fetch(url,options);
    const data = await response.json();
    if (response.ok === true){
      onsubmitSuccess(data.jwt_token);
    }
    else{
      onsubmitFailure(data.error_msg);
    }
  };


  return (
    <>
      <div className='Login-page-container'>
        <div className='image-container'>
          <img src="https://res.cloudinary.com/dvsivw05r/image/upload/v1755767125/Illustration_x26dy4.png" alt="login-page-image" className='login-page-image'/>
        </div>
        <div className='login-form-container-main'>
          <form className='Login-form-container' onSubmit={submitform}>
          < div className='logo-block'>
              <img src='https://res.cloudinary.com/dvsivw05r/image/upload/v1755856792/Standard_Collection_8_kqmil4.png' alt="login-form-logo" className='login-form-logo'/>
              <h1 className='form-heading'>Insta Share</h1>
            </div>
            <div className='input-container-main'>
              <label className='input-labenpm l' htmlfor="username">USERNAME</label>
              <input type="text" value={username} onChange={onChangeUsername} className='input-container' id="username" placeholder='Usernaame'></input>
            </div>
            <div className='input-container-main'>
              <label className='input-label' htmlfor="password">PASSWORD</label>
              <input type="password" value={password} onChange={onChangePassword} className='input-container' id="password" placeholder='Password'></input>
            </div>
            <button className='submit-button' type='submit'>Login</button>
            {showsubmiterror && <p className='errormssg-login-form'>{errormssg}</p>}
          </form>
        </div>  
      </div>
    </>
  )
}

export default Login
