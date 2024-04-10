import React, { useState } from "react";
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";


export default function Register() {

  const navigate = useNavigate();

  const [formData, setData] = useState({ username: '', email: '', password: '' });

  function handleInput(event) {
    const { name, value } = event.target;
    setData({ ...formData, [name]: value });
  }
  axios.defaults.withCredentials = true;
  async function handleSubmit() {
    const res = await axios.post(import.meta.env.VITE_url + "register", formData);
    if (res.data.status == 'exist'){
      window.alert(res.data.data);
      navigate("/login");
    }else if(res.data.status == 'success'){
      window.alert('User registration successful. Please log in to continue');
      navigate('/login');
    }else{
      window.alert('Some Error  Occurred!.Redirecting to Home Page');
      navigate( "/" );
    }
    
  }
  async function handleClick(e) {

    const provider = await new GoogleAuthProvider();
    const userDetails = await signInWithPopup(auth, provider);
    const username = userDetails.user.displayName;
    const email = userDetails.user.email;
    const password = "google-firebase"; // User will not be asked to enter a password
    const googleUser = {username,email,password}
    const res = await axios.post(import.meta.env.VITE_url+ "register", googleUser)
    console.log(res)
    navigate("/login");

  }



  return <div id="container" className="container">
    <h2 id='welcome' className="welcome">Begin Your Journey</h2>
    <form action='/register' method='post' id='fromRegister' className="register" onSubmit={(event) => {
      handleSubmit(); event.preventDefault();
    }}>
      <label htmlFor="email">Username:</label>
      <input type="text" id="username" name="username" required placeholder="Enter your username" onChange={handleInput} value={formData.username} />
      <label htmlFor="email">E-Mail:</label>
      <input type="text" id="email" name="email" required placeholder="Enter your email" onChange={handleInput} value={formData.email} />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required placeholder="Enter your password" onChange={handleInput} value={formData.password} />
      <button id='normalButton' className='normalButton' type="submit">Register with Username</button>
    </form>
    <button id='google' className="google" onClick={handleClick}>Register with Google</button>
  </div>;
}
