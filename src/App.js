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
import "./hover.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Mypage from "./pages/Mypage/Mypage";
import Mypage_setting from "./pages/Mypage/Mypage_setting";
import { SurveyList } from "./pages/SurveyList/SurveyList";
import { SurveyContextProvider } from "./services/servey/survey.context";
import axios from "axios";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";

export const FormHandlingContext = React.createContext();

export const AuthContext = React.createContext();
const Test = () => {
    const link = "http://localhost:8080/app/user/login";
    const user = {
        userId: "test4",
        userPw: "qwer1234!",
    };
    const userLogin = () => {
        axios
            .post(link, user)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <button onClick={userLogin}>login</button>
        </div>
    );
};

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

    return (
        <AuthenticationContextProvider>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                <SurveyContextProvider>
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
                                <Route path="test" element={<Test />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </SurveyContextProvider>
            </AuthContext.Provider>
        </AuthenticationContextProvider>
    );
}

export default App;
