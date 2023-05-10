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
import Mypage from "./pages/Mypage/Mypage";
import Mypage_setting from "./pages/Mypage/Mypage_setting";

import "./App.css";
import "./hover.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { SurveyContextProvider } from "./services/survey/survey.context";
import { AuthenticationContextProvider } from "./services/authentication/authentication.context";

export const FormHandlingContext = React.createContext();

export const AuthContext = React.createContext();

function App() {
    return (
        <AuthenticationContextProvider>
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
                        </Route>
                    </Routes>
                </BrowserRouter>
            </SurveyContextProvider>
        </AuthenticationContextProvider>
    );
}

export default App;
