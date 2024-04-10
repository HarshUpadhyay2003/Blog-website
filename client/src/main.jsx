import React, {  StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {CookiesProvider} from 'react-cookie'
import App from './App.jsx'
import './styles/styles.css'

let imageStyle = {
  position: 'fixed',
  bottom:"0",
  height: "100%",
  width: "100%",
  backgroundImage:
  'url("/images/bg4.jpg")',
  backgroundSize: "100% 100% ",
  backgroundPosition:"center",
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
  <StrictMode>
  <div>
  <App />
    <div className = "image"
            style = {imageStyle}>
            
    </div>
    </div>
  </StrictMode>
  </CookiesProvider>
 
);