import React, {useState} from "react";
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {auth} from "../config/firebaseConfig"


export default function Login(){
  const navigate = useNavigate()
    const [formData, setData] = useState({username : '' , password : ''})
  
    function handleInput(event){
      const {name, value} = event.target;
      setData({...formData, [name]:value});
    }
    async function handleSubmit(){
      const res = await axios.post(import.meta.env.VITE_url + "login", formData)
      const status = res.status;
      const user = res.data.user;
      console.log(res)
      localStorage.setItem("status",status)
      localStorage.setItem("username",user);
      if (status ==200){
        navigate("/Home")
      }else if(res.data.status === "unsuccessful"){
        window.alert("Wrong Credentiatls. Try Again.")
        window.location.reload();
      }else{
        window.alert(res.data.status);
        navigate('/Register')
      }
      
    }

     async function handleClick(e){
      const provider = await new GoogleAuthProvider();
      const userDetails =  await signInWithPopup(auth,provider);
      const username = userDetails.user.displayName;
      const password = "google-firebase";
      const googleUser = {username,password}
      const res = await axios.post(import.meta.env.VITE_url + "login", googleUser)
      localStorage.setItem("status",res.status)
      localStorage.setItem("username",res.data.user);
      navigate("/home");
    }
    

    return (
    <div id="container" className="container" >
    <h2 id = 'welcome' className="welcome"  >Continue Your Journey</h2>
    <form action='/login' method='post' id = 'formLogin' className="login" onSubmit={(event)=>{
      handleSubmit() ; event.preventDefault()}} >
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" required placeholder="Enter your username" onChange={handleInput} value={formData.username}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required placeholder="Enter your password" onChange={handleInput} value={formData.password}/>
      <button id = 'normalButton' className="normalButton" type="submit">Login with Username</button> 
    </form>
    <button id = 'google' className="google" onClick={handleClick}>Login with Google</button>
  </div> )
}
