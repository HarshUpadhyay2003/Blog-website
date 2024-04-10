import React from 'react';
import { useNavigate} from 'react-router-dom';

export default function Landing(){

    const navigate = useNavigate();


return  <div id='main-container' className="main-container">
<div id = 'container' className="container">
    <h1 id='welcome' className='welcome'>Welcome to Blogging Website</h1>
    <div id='land' className="land">
        <button  onClick={()=>{navigate("/login")}} className="login-button" >Login</button>
        <button  onClick={()=>{navigate("/register")}} className="register-button" >Register</button>
    </div>
</div>
</div>
}

