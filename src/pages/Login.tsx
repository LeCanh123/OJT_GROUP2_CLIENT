//facebook
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FacebookAuth from './../module/facebook/Facebook'; 
import Facebook from './../module/facebook/Facebook'; 
import UserProfile from './../module/facebook/UserProfile';
import FacebookLoginButton from './../module/facebook/Facebook';
import { useEffect, useState } from 'react';



import React from 'react'

export default function Login() {
      //facebook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', picture: { data: { url: '' } } });

  const handleLogin = (response: any) => {
    setIsLoggedIn(true);
    setUserData(response);
  };


  return (
    <div className='container'>
              {/* facebook */}
 <div>
      {isLoggedIn ? (
        <UserProfile user={userData} />
      ) : (
        <div className="mt-4" style={{borderRadius:"50px" ,width:"250px",height:"60px",overflow:"hidden" ,backgroundColor:"#4c69ba"}}>
        <FacebookLoginButton onLogin={handleLogin} />
        </div>
      )}
    </div>
    </div>
  )
}
