import React, { useState } from "react";
import axios from  'axios';
import '../styles/create.css'
import {useNavigate} from 'react-router-dom'



export default function Create(){

    const navigate = useNavigate();

    const [blogData, setData] = useState({title:'',content:''});

     function handleInput(event){
        const {name, value} = event.target;
         setData({...blogData,[name]:value})
        
    };

    
     function  handleSubmit(){
        const res =  axios.post(import.meta.env.VITE_url + "create", {title:blogData.title, content:blogData.content});
        window.alert("Post Submitted Successfully.")
        navigate('/home')
    }

    return<>
    <form action="/create" method="post" onSubmit={(event)=>{
      handleSubmit() ; event.preventDefault()}}>
        <h1 className="create-heading">Create Post</h1>
        <input type="text" className="post-input" name="title" id="post-title" placeholder="Enter post title here..." required onChange={handleInput} value={blogData.title}/>
        <textarea className="post-content" name="content" id="post-body" placeholder="Enter post body here..." required onChange={handleInput} value={blogData.content}/>
        <button type='submit'  className="new-post" id="create-post">Create Post</button>
    </form>
    </>
}