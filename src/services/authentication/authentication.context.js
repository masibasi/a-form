import React, { useState, createContext } from "react";
import { loginHandler } from "./authentication.service";
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    const onLogin = (id, password) => {
        const res = AuthenticationContext(id, password);
        setUser(res.token);
        setIsLogin(res.login);
    };
    return (
        <AuthenticationContext.Provider
            value={{
                user,
                isLoading,
                onLogin,
                isLogin,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
