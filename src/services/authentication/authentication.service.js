import axios from "axios";
import { useNavigate } from "react-router-dom";

export const loginHandler = (userId, userPassword) => {
    const loginData = {
        userId: userId,
        userPw: userPassword,
    };
    const navigate = useNavigate;
    axios
        .post("http://localhost:8080/app/user/login", loginData, { "Content-Type": "application/json" })
        .then((res) => {
            alert("로그인 되었습니다!");

            localStorage.setItem("isLoggedIn", true);
            navigate("/");
            return { token: res.data, login: true };
        })
        .catch((err) => {
            if (err.response.status === 403) {
                alert("Invalid User");
            } else {
                alert(err);
            }
        });
};
