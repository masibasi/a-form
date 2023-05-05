import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/Home";
import CreateSurvey from "./pages/CreateSurvey/CreateSurvey";
import Survey from "./pages/Survey/Survey";
import About from "./pages/About/About";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import { CreateAvsB } from "./pages/CreateAvsB/CreateAvsB";
import { Community } from "./pages/Community/Community";
import { SurveyDetail } from "./pages/Survey/SurveyDetail";
import LoginForm from "./pages/LoginForm/LoginForm";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import Mypage from "./pages/Mypage/Mypage";
import Mypage_setting from "./pages/Mypage/Mypage_setting";
import { SurveyList } from "./pages/SurveyList/SurveyList";

export const FormHandlingContext = React.createContext();
export const FormStateContext = React.createContext();
export const AuthContext = React.createContext();
export const IdContext = React.createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

    // Create
    const onCreate = (type, deadline, title, description, questions) => {
        // send newSurvey to database
        const options = { headers: { "Content-Type": "application/json" } };
        const q = questions;
        q.map((it) => {
            delete it["id"];
        });
        const newSurvey = {
            type: type,
            title: title,
            description: description,
            deadline: "2023-05-04T12:50:18.171Z",
            questions: questions,
            author: 0, // 로그인 한 사람 아이디 동적으로 바뀌게 수정 필요
        };
        const formId = axios
            .post("http://localhost:3010/surveys", newSurvey, options)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });

        return formId;
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <FormHandlingContext.Provider value={{ onCreate }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="mypage" element={<Mypage />} />
                            <Route path="create" element={<CreateSurvey />} />
                            <Route path="survey/:id" element={<Survey />} />
                            <Route path="register" element={<RegisterForm />} />
                            <Route path="login" element={<LoginForm />} />
                            <Route path="community" element={<Community />} />
                            <Route path="AvsB" element={<CreateAvsB />} />
                            <Route path="mypage_setting" element={<Mypage_setting />} />
                            <Route path="details/:id" element={<SurveyDetail />} />
                            <Route path="surveyList" element={<SurveyList />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </FormHandlingContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
