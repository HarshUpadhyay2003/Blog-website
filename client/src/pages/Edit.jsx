import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.css'
import { useNavigate } from 'react-router-dom';

export default function Edit(){
    const navigate = useNavigate();

    const [content,getContent] = useState({title:'',content:''});

    async function fetchContent(){
        const res = await axios.post(import.meta.env.VITE_url + "getContent",{id:localStorage.getItem('id')})
        let title = res.data.post.post_title;
        let data = res.data.post.post_content;
        getContent({title:title, content:data})
    }

    function handleInput(event){
        const {name, value} = event.target;
         getContent({...content,[name]:value})

    }

    function  handleSubmit(){
        const res =  axios.post(import.meta.env.VITE_url + "edit", {title:content.title, content:content.content, id:localStorage.getItem('id')});
        window.alert("Post Submitted Successfully.")
        navigate('/home')
    }

    

    useEffect(()=>{
        fetchContent()
    },[])

    return<>
    <form action="/create" method="post" onSubmit={(event)=>{
      handleSubmit() ; event.preventDefault()}}>
        <h1 className="create-heading">Edit Post</h1>
        <input type="text" className="post-input" name="title" id="post-title" placeholder="Enter post title here..." required onChange={handleInput} value={content.title}/>
        <textarea className="post-content" name="content" id="post-body" placeholder="Enter post body here..." required  onChange={handleInput} value={content.content}/>
        <button type='submit'  className="new-post" id="create-post">Submit Post</button>
    </form>
    </>
}