/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FacebookLogin from "react-facebook-login";

interface FacebookLoginButtonProps {
  onLogin: (response: any) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  onLogin,
}) => {
  const responseFacebook = (response: any) => {
    onLogin(response);
  };

  return (
    <FacebookLogin
      appId="686736140068860"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      textButton="Đăng nhập bằng Facebook"
      buttonStyle={{width:"300px",fontSize:"15px",backgroundColor:"#1877f2",fontWeight:"bold",textTransform:"inherit"}}
    />
  );
};

export default FacebookLoginButton;
