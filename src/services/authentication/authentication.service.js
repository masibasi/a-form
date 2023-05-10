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
export const GetUserData = async (userToken) => {
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };
    const result = await axios
        .get(`${USER_API_URL}/app/user/info`, options)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
};

/*
 * 아이디 중복확인 API
 *
 * @variable userId
 *
 * @return ok
 */
//  @CrossOrigin
//  @GetMapping(path = "/idcheck/{userId}")

/*
 * 회원탈퇴 API
 *
 * @variable userPk
 *
 * @return ok, "deleted"
 */
// @CrossOrigin
// @DeleteMapping(path = "/delete")
