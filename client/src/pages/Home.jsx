import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.css'
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_url;


export default function Home(){
    const navigate = useNavigate();
    

   const [content, setContent] = useState([]);
   const [user, setUser] = useState('');



   async function fetchContent(){
    const res =  await axios.get(backendUrl+'post');
    setContent(res.data);
   }

   function getUsername(){
    if(localStorage.getItem('status')==200){
        setUser(localStorage.getItem("username"));
    }else{
        navigate('/login')
    }
   }

   const logout = () => {
    localStorage.clear()
    window.alert("Logging Out Current User.")
    navigate('/login') 
}

   useEffect(()=>{
    fetchContent();
    getUsername();
   },[])

   function handleEdit(e){
    let {id} = e.target;
    localStorage.setItem("id",id)
    navigate('/edit')
   }

   async function handleClick(e){
    let {id}  = e.target
    const res = await axios.post(backendUrl+'del',{id:id})
    const status = res.data.status;
    if (status === "success"){
        window.alert("Post Deleted Succesfully.");
        window.location.reload();
    }else{
        window.alert("Some Problem Occurred.")
    }
   }

    return<>
        <div className="home-container">
        <h1 className="welcome-heading">Welcome {user}</h1>
        <div className='btn-container'>
        <button onClick={()=>navigate('/Create')} className="create-post-btn">Create Post</button>
        <button className='logout-btn' onClick={logout}>Logout</button>
        </div>
        <div className="existing-posts">
            <h2 >Existing Posts</h2>
            {content.map((value, key)=>{
                return (
                <div className="post-container" key={key}>
                <h1 className='title'>{value.post_title}</h1>
                <p className='content'>{value.post_content}</p>
                <button  className="delete-post-btn"  ><span id={value.post_id} className="material-symbols-outlined" onClick={handleClick}>delete</span></button>
                <button className='edit-post-btn'><span id={value.post_id} className="material-symbols-outlined" onClick={handleEdit}>edit</span></button>
            </div>
            
                );
            })}
            
        </div>

    </div>
    </>
}