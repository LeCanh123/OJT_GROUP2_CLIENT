/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import FacebookLoginButton from "../../../../module/facebook/Facebook";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../../redux/store";
import { authUserAction } from "../../../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const TYPE_LOGIN = {
  GOOGLE: 0,
  FACEBOOK: 1,
} as const;
export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((store: StoreType) => {
    return store.authUserStore.data;
  });

  const getGoogleAuthUserInfo = async (accessToken: string) => {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  };

  const handleGetTokenFromServer = async (payload: {
    email: string;
    displayName: string;
    type_login: number;
  }): Promise<{
    status: boolean;
    message: string;
    result: { token: string; user: any };
  }> => {
    const respone = await axios.post(
      "http://localhost:3000/api/v1/auth/token",
      payload
    );
    return respone.data;
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { access_token } = codeResponse;
      const authUser = await getGoogleAuthUserInfo(access_token);
      const data = await handleGetTokenFromServer({
        email: authUser.email,
        displayName: authUser.name,
        type_login: TYPE_LOGIN.GOOGLE,
      });
      localStorage.setItem("token", data.result.token);
      dispatch(authUserAction.setAuthUser(data.result.user));
      navigate("/");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleGoogleLogOut = () => {
    googleLogout();
    dispatch(authUserAction.reset());
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            color: "#282a35",
            fontSize: "29px",
            fontWeight: "700",
            marginTop: "40px",
          }}
        >
          Log in
        </h2>
        {authUser ? (
          <div>
            <h3>User Logged in</h3>
            <p>Name: {authUser.displayName}</p>
            <p>Email Address: {authUser.email}</p>
            <p>userId: {authUser.id}</p>
            <br />
            <br />
            <button onClick={() => handleGoogleLogOut()}>Log out</button>
          </div>
        ) : null}
        <div
          style={{
            width: "100%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            flex: "1",
          }}
        >
          <div
            style={{
              width: "250px",
              height: "40px",
              backgroundColor: "#4c69ba",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => handleGoogleLogin()}
          >
            Login with Google
          </div>
          <div
            style={{
              width: "250px",
              height: "40px",
              backgroundColor: "#4c69ba",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
            }}
          >
            {/* <FacebookLoginButton onLogin={handleLogin} /> */}
            Login with Facebook
          </div>
        </div>
      </div>
    </div>
  );
}