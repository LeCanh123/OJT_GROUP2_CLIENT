/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//facebook
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FacebookAuth from "./../module/facebook/Facebook";
import Facebook from "./../module/facebook/Facebook";
import UserProfile from "./../module/facebook/UserProfile";
import FacebookLoginButton from "./../module/facebook/Facebook";
import { useEffect, useState } from "react";

import React from "react";
import Google from "../module/google/Google";
import Test from "../module/test/Test";

export default function Login() {
  //facebook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    picture: { data: { url: "" } },
  });

  const handleLogin = (response: any) => {
    setIsLoggedIn(true);
    setUserData(response);
  };

  return (
    <div className="container">
      {/* facebook */}
      <div>
        {isLoggedIn ? (
          <UserProfile user={userData} />
        ) : (
          <>
            <FacebookLoginButton onLogin={handleLogin} />
            <Google /> <Test />
          </>
        )}
      </div>

      {/* google */}
      <div></div>
    </div>
  );
}
