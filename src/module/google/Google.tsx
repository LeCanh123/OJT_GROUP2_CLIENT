import React from 'react';
import { GoogleLogin } from 'react-google-login';
import LoginApi from "./../../apis/Login"
import { Table, message } from 'antd';
import { authUserAction } from '../../redux/AuthSlice'; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseGoogle = async(response:any) => {
    console.log(response);
    try{
        let loginGoogleResult=await LoginApi.loginWithGoogle(response)
        console.log("loginGoogleResult",loginGoogleResult);
        if(loginGoogleResult.status){
          localStorage.setItem("token",loginGoogleResult.token);
          message.success(loginGoogleResult.message);
          dispatch(authUserAction.setAuthUser(true));
          navigate("/")
        }else{
          message.error(loginGoogleResult.message)
          dispatch(authUserAction.setAuthUser(false));
        }
      }
      catch(err){
  
      }
  };

  return (
    <GoogleLogin
      clientId="749333288267-io0mik6vpnfpqli0ufl8dkgh4vg6e6a4.apps.googleusercontent.com"
      buttonText="Đăng nhập bằng Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;