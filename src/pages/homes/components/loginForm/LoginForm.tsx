/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import FacebookLoginButton from "../../../../module/facebook/Facebook";
import LoginApi from "./../../../../apis/Login"
import { Table, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { authUserAction } from "../../../../redux/AuthSlice"; 
import GoogleLoginButton from "../../../../module/google/Google";
import { gapi } from 'gapi-script';
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    function start() {
    gapi.client.init({
    clientId : "idCliente",
    scope : ''
    })
    }
    gapi.load('client:auth2',start);
    });
    
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
      const loginFacebookResult=await LoginApi.loginWithFacebook(response);
      console.log("loginFacebookResult",loginFacebookResult);
      if(loginFacebookResult.status){
        localStorage.setItem("token",loginFacebookResult.token);
        message.success(loginFacebookResult.message);
        dispatch(authUserAction.setAuthUser(true));
        navigate("/")
      }else{
        message.error(loginFacebookResult.message)
        dispatch(authUserAction.setAuthUser(false));
      }
    }
    catch(err){

    }
  };
  return (
    <div  style={{marginBottom:"150px",marginTop:"150px"}}>
      <div
        style={{
          width: "450px",
          height: "400px",
          margin: "0 auto",
          border: "1px solid #ced4da",
          borderRadius: "20px",
          listStyle: "none",
          marginTop: "50px",
        }}
      >
        <h2
          style={{
            color: "#282a35",
            fontSize: "29px",
            fontWeight: "700",
            // marginLeft: "50px",
            // marginTop: "40px",
            margin:"0 auto",
            // backgroundColor:"red",
           textAlign:"center",

           paddingTop:"50px"
          }}
        >
          <div>
          Đăng nhập
          </div>
        </h2>
        <li style={{ marginLeft: "100px", marginTop: "50px" }}>
          <div
            className="mt-4"
            style={{
              borderRadius: "50px",
              width: "290px",
              height: "40px",
              overflow: "hidden",
              backgroundColor: "white",
              paddingBottom: "60px",
              position:"relative",
              left:"-20px"
            }}
          >
            <FacebookLoginButton onLogin={handleLogin} />
          </div>
        </li>
        <br /> <br />
        <li style={{ marginLeft: "100px" }}>
          <div
            className="mt-4 googlelogin1"
            style={{
              borderRadius: "50px",
              width: "290px",
              height: "60px",
              overflow: "hidden",
              backgroundColor: "white",
              border:"1px solid grey",
              position:"relative",
              left:"-20px",

              top:"-40px"
            }}
          >
            <div style={{position:"relative",left:"30px",top:"6px"}}>
            <GoogleLoginButton />

            </div>
          </div>
        </li>
        <br /> <br />
      </div>
    </div>
  );
}