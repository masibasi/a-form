import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import "./Login.css";
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { setIsLoggedIn } = useContext(AuthContext);

  const idChange = (e) => {
    setUserId(e.target.value);
  }
  const passwordChange = (e) => {
    setUserPassword(e.target.value);
  }

  useEffect(() => {
  }, []);

  const loginClick = () => {
    axios
      .post(
        "/user/login",
        {
          userId,
          userPassword
        },
        { 'Content-Type': 'application/json' }
      )
      .then((res) => {
        alert("Success!");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 403){
          alert("Invalid User")
        }
        else{
          alert(err);
        }
      });

  }
  const enterKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginClick();
    }
  }
  const register = (e) => {
    navigate("/register")
  }

  return (
    <div className="Auth-form-container">
      <div className="Auth-form" >
        <div className="Auth-form-content">
          <div className="sharpic">
          </div>
          <br></br>
          <div className="form-group mt-3">
            <label>ID</label>
            <input
              type="text"
              name="id"
              className="form-control mt-1"
              placeholder="Enter id"
              onChange={idChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={passwordChange}
              onKeyDown={enterKeyPress}
            />
          </div>
          <br></br>
          <br></br>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={register} style={{cursor: "pointer"}}>
              Sign Up
            </span>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="dark" onClick={loginClick} className="btn btn-primary">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>


  );
}