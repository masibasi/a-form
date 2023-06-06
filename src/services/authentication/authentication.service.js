import axios from "axios";

const USER_API_URL = process.env.REACT_APP_USER_API_URL;

export const loginHandler = (userId, userPassword) => {
    const loginData = {
        userId: userId,
        userPw: userPassword,
    };

    let loginResult = axios
        .post(`${USER_API_URL}/api/user/login`, loginData, { "Content-Type": "application/json" })
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
        .post(`${USER_API_URL}/api/user/join`, registerData, options)
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
        .get(`${USER_API_URL}/api/user/info`, options)
        .then((response) => {
            console.log("getUserData : ", response.data);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
};

export const getIdCheck = async (userId) => {
    console.log("id 중복체크");
    const result = await axios
        .get(`${USER_API_URL}/api/user/idCheck/${userId}`)
        .then((res) => {
            console.log(res);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
};

/*
 * 회원탈퇴 API
 *
 * @variable userPk
 *
 * @return ok, "deleted"
 */
// @CrossOrigin
// @DeleteMapping(path = "/delete")
