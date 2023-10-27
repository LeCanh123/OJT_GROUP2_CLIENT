import React from 'react';
import { GoogleLogin } from 'react-google-login';
import LoginApi from "./../../apis/Login"
import { Table, message } from 'antd';


const GoogleLoginButton = () => {
  const responseGoogle = async(response:any) => {
    console.log(response);
    try{
        let loginGoogleResult=await LoginApi.loginWithGoogle(response)
        console.log("loginGoogleResult",loginGoogleResult);
        if(loginGoogleResult.status){
          localStorage.setItem("token",loginGoogleResult.token);
          message.success(loginGoogleResult.message);
  
        }else{
          message.error(loginGoogleResult.message)
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