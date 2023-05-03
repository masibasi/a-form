import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../LoginForm/Login.css";

import { useNavigate } from "react-router-dom";

import Icon from "../../assets/images/girlIcon.png";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userGender, setUserGender] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [birthdate, setBirthdate] = useState({
    year: 2023,
    month: "01",
    day: "01",
  });
  const [userBirthday, setUserBirthday] = useState("");
  const [isValidUserPassword, setIsValidUserPassword] = useState(false);
  const [isValidUserPhone, setIsValidUserPhone] = useState(false);

  const validatePassword = (value) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = pattern.test(value);
    setIsValidUserPassword(isValid);
  };

  const validatePhone = (value) => {
    const pattern = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    const isValid = pattern.test(value);
    setIsValidUserPhone(isValid);
  };

  const idChange = (e) => {
    setUserId(e.target.value);
  };
  const nicknameChange = (e) => {
    setUserNickname(e.target.value);
  };
  const emailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const passwordChange = (e) => {
    const value = e.target.value;
    setUserPassword(value);
    validatePassword(value);
  };
  const genderChange = (e) => {
    setUserGender(e.target.value);
  };
  const phoneChange = (e) => {
    const value = e.target.value;
    setUserPhone(value);
    validatePhone(value);
  };
  const addressChange = (e) => {
    setUserAddress(e.target.value);
  };

  useEffect(() => {}, []);

  //생년월일 지정하는 코드
  const now = new Date();

  let years = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }
  let days = [];
  let date = new Date(birthdate.year, birthdate.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  const confirm = (e) => {
    axios
      .post("http://localhost:8080/api/user", {
        userId,
        userPassword,
        userEmail,
        userNickname,
        userPhone,
        userAddress,
        userBirthday,
        userGender,
      })
      .then((res) => {
        alert("Register Success");

        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("Invalid User Inputs");
        } else if (err.response.status === 409) {
          alert(err.response.data);
        } else {
          alert(err);
        }
      });
  };

  const login = (e) => {
    navigate("/login");
  };

  return (
    <div className="Auth-form-container">
      <img src={Icon} alt="" />
      <h1>Hello!</h1>
      <h5>
        Please enter your personal details to <br />
        your account
      </h5>
      <div className="Auth-form">
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Nickname</label>
            <input type="text" className="form-control mt-1" value={userNickname} onChange={nicknameChange} />
          </div>
          <div className="form-group mt-3">
            <label>ID</label>
            <input type="text" className="form-control mt-1" onChange={idChange} />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input type="email" className="form-control mt-1" onChange={emailChange} />
          </div>
          <div className="form-group mt-3">
            <label>Birthdate</label>
            <div className="formBirthdayWrapper">
              <select
                className="selectYear"
                value={birthdate.year}
                onChange={(e) => {
                  setBirthdate({
                    ...birthdate,
                    year: e.target.value,
                  });
                  setUserBirthday(`${birthdate.year}-${birthdate.month}-${birthdate.day} 23:59:59`);
                }}
              >
                {years.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="selectMonth"
                value={birthdate.month}
                onChange={(e) => {
                  setBirthdate({
                    ...birthdate,
                    month: e.target.value,
                  });
                  setUserBirthday(`${birthdate.year}-${birthdate.month}-${birthdate.day} 23:59:59`);
                }}
              >
                {month.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="selectDay"
                value={birthdate.day}
                onChange={(e) => {
                  setBirthdate({
                    ...birthdate,
                    day: e.target.value,
                  });
                  setUserBirthday(`${birthdate.year}-${birthdate.month}-${birthdate.day} 23:59:59`);
                }}
              >
                {days.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" onChange={passwordChange} />
            {!isValidUserPassword && <div style={{ color: "red", fontSize: "12px" }}>비밀번호는 8글자 이상이어야 하며 영문/숫자를 포함해야합니다.</div>}
            {isValidUserPassword && <div style={{ color: "green", fontSize: "12px" }}>올바른 비밀번호 형식입니다.</div>}
          </div>
          <div className="form-group mt-3">
            <label>Gender</label>
            <Form.Select onChange={genderChange}>
              <option>Select</option>
              <option value={true}>MALE</option>
              <option value={false}>FEMALE</option>
            </Form.Select>
          </div>
          <div className="form-group mt-3">
            <label>Phone</label>
            <input type="text" className="form-control mt-1" onChange={phoneChange} />
            {!isValidUserPhone && <div style={{ color: "red", fontSize: "12px" }}>올바른 핸드폰 번호 형식이 아닙니다.</div>}
            {isValidUserPhone && <div style={{ color: "green", fontSize: "12x" }}>올바른 핸드폰 번호 형식입니다.</div>}
          </div>
          <div className="form-group mt-3">
            <label>Address</label>
            <input type="text" className="form-control mt-1" onChange={addressChange} />
          </div>

          <br></br>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={login} style={{ cursor: "pointer" }}>
              Sign In
            </span>
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="dark" onClick={confirm} className="btn btn-primary">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
