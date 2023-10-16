/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import FacebookLoginButton from "../facebook/Facebook";

export default function Test() {
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
    <div>
      <div
        style={{
          width: "450px",
          height: "400px",
          margin: "0 auto",
          border: "1px solid #ced4da",
          borderRadius: "4px",
          listStyle: "none",
        }}
      >
        <h2
          style={{
            color: "#282a35",
            fontSize: "29px",
            fontWeight: "700",
            marginLeft: "50px",
            marginTop: "40px",
          }}
        >
          Log in
        </h2>
        <li style={{ marginLeft: "100px", marginTop: "50px" }}>
          <div
            className="mt-4"
            style={{
              borderRadius: "50px",
              width: "250px",
              height: "60px",
              overflow: "hidden",
              backgroundColor: "#4c69ba",
            }}
          >
            <FacebookLoginButton onLogin={handleLogin} />
          </div>
        </li>
        <br /> <br />
        <li style={{ marginLeft: "100px" }}>
          <div
            className="mt-4"
            style={{
              borderRadius: "50px",
              width: "250px",
              height: "60px",
              overflow: "hidden",
              backgroundColor: "#4c69ba",
            }}
          >
            <FacebookLoginButton onLogin={handleLogin} />
          </div>
        </li>
        <br /> <br />
      </div>
    </div>
  );
}
