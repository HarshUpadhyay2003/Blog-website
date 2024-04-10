import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import Edit from './pages/Edit.jsx';



export default function App(){
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/home" element={<Home />}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit' element={<Edit/>}></Route>
      </Routes>
      </BrowserRouter>
  )
}
