import React, { useState, createContext } from "react";
import { loginHandler } from "./authentication.service";
import { registerHandler, GetUserData } from "./authentication.service";

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
                userToken, // 유저를 식별하는 토큰을 저장하는 객체
                onLogin, // 로그인 시도시 호출하는 함수
                isLogin, // 로그인 되었다고 알려주는 변수
                onLogout, // 로그아웃을 처리해주는 함수
                onRegister, // 회원가입을 처리해주는 함수
                regComplete, // 회원가입 완료 상태를 알려주는 변수
                GetUserData, // 유저 데이터를 반환하는 함수
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
