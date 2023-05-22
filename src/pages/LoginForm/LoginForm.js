import React, { useContext, useEffect, useState } from "react";

import "./Login.css";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export default function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const { onLogin, isLogin } = useContext(AuthenticationContext);

    const idChange = (e) => {
        setUserId(e.target.value);
    };
    const passwordChange = (e) => {
        setUserPassword(e.target.value);
    };

    useEffect(() => {
        isLogin && navigate("/");
    }, [isLogin]);

    const enterKeyPress = (e) => {
        if (e.key === "Enter") {
            onLogin(userId, userPassword);
        }
    };
    const register = (e) => {
        navigate("/api/register");
    };

    return (
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <div className="sharpic"></div>
                    <br></br>
                    <div className="form-group mt-3">
                        <label>ID</label>
                        <input type="text" name="id" className="form-control mt-1" placeholder="Enter id" onChange={idChange} />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input type="password" className="form-control mt-1" placeholder="Enter password" onChange={passwordChange} onKeyDown={enterKeyPress} />
                    </div>
                    <br></br>
                    <br></br>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span className="link-primary" onClick={register} style={{ cursor: "pointer" }}>
                            Sign Up
                        </span>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button variant="dark" onClick={() => onLogin(userId, userPassword)} className="btn btn-primary">
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
