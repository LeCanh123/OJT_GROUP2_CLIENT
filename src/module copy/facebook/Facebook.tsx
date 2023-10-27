/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import FacebookLogin from 'react-facebook-login';

interface FacebookLoginButtonProps {
  onLogin: (response: any) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({ onLogin }) => {
  const responseFacebook = (response: any) => {
    onLogin(response);
  };

  return (
    <FacebookLogin
      appId="645111284412266"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
}

export default FacebookLoginButton; 