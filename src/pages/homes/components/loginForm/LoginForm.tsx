/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import FacebookLoginButton from "../../../../module/facebook/Facebook";
import LoginApi from "./../../../../apis/Login"
import { Table, message } from 'antd';


export default function LoginForm() {
  //facebook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    picture: { data: { url: "" } },
  });


  //facebook
  const handleLogin = async(response: any) => {
    setIsLoggedIn(true);
    setUserData(response);
    console.log("response",response);
    try{
      let loginFacebookResult=await LoginApi.loginWithFacebook(response);
      console.log("loginFacebookResult",loginFacebookResult);
      if(loginFacebookResult.status){
        localStorage.setItem("token",loginFacebookResult.token);
        message.success(loginFacebookResult.message)
      }else{
        message.error(loginFacebookResult.message)
      }
    }
    catch(err){

    }
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
          marginTop: "50px",
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
              height: "40px",
              overflow: "hidden",
              backgroundColor: "#4c69ba",
              paddingBottom: "60px",
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
              backgroundColor: "white",
            }}
          >
            {/* <GoogleLoginButton /> */}
          </div>
        </li>
        <br /> <br />
      </div>
    </div>
  );
}
