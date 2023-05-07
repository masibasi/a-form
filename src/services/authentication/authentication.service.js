import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const loginHandler = (userId, userPassword) => {
    const loginData = {
        userId: userId,
        userPw: userPassword,
    };

    let loginResult = axios
        .post("http://localhost:8080/app/user/login", loginData, { "Content-Type": "application/json" })
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
