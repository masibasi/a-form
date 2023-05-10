import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_API_URL = process.env.REACT_APP_USER_API_URL;

export const loginHandler = (userId, userPassword) => {
    const loginData = {
        userId: userId,
        userPw: userPassword,
    };

    let loginResult = axios
        .post(`${USER_API_URL}/app/user/login`, loginData, { "Content-Type": "application/json" })
        .then((res) => {
            localStorage.setItem("isLoggedIn", true);
            return res;
        })
        .catch((err) => {
            if (err.response === 403) {
                alert("Invalid User");
            } else {
                alert(err);
            }
        });

    return loginResult;
};

export const registerHandler = (registerData) => {
    const options = { headers: { "Content-Type": "application/json" } };
    console.log(JSON.stringify(registerData));
    let regResult = axios
        .post(`${USER_API_URL}/app/user/join`, registerData, options)
        .then((res) => {
            alert("Register Success");
            return true;
        })
        .catch((err) => {
            if (err.response.status === 400) {
                alert("Invalid User Inputs");
                return false;
            } else if (err.response.status === 409) {
                alert(err.response.data);
                return false;
            } else {
                alert(err);
                return false;
            }
        });

    return regResult;
};
