import React, { useState, createContext } from "react";
import { loginHandler } from "./authentication.service";
import { registerHandler } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [regComplete, setRegComplete] = useState(false);

    const onLogin = async (userId, userPassword) => {
        let loginRes = await loginHandler(userId, userPassword);
        console.log(loginRes);
        if (loginRes.data == "아이디가 존재하지 않습니다.") {
            alert("아이디가 존재하지 않습니다.");
            return;
        } else if (loginRes.data == "비밀번호가 일치하지 않습니다.") {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        } else {
            setUserToken(loginRes.data);
            setIsLogin(true);
            alert("로그인 되었습니다!");
        }
    };

    const onLogout = () => {
        setUserToken("");
        setIsLogin(false);
        alert("로그아웃 되었습니다!");
        window.location.reload();
    };

    const onRegister = async (registerData) => {
        setRegComplete(false);
        let loginRes = await registerHandler(registerData);
        setRegComplete(loginRes);
    };

    return (
        <AuthenticationContext.Provider
            value={{
                userToken,
                isLoading,
                onLogin,
                isLogin,
                onLogout,
                onRegister,
                regComplete,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
