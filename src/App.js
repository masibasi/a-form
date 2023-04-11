import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import CreateSurvey from "./components/CreateSurvey";
import Survey from "./components/Survey";
import About from "./components/About";
import RegisterForm from "./components/RegisterForm";

import LoginForm from "./components/LoginForm";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export const FormHandlingContext = React.createContext();
export const FormStateContext = React.createContext();
export const AuthContext = React.createContext();
export const IdContext = React.createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn")
    );
    const nextSurveyId = useRef(1); // 전체 forms 의 id를 관리하는 변수
    const [formData, setFormData] = useState([]); //Form 전체 데이터 관리 state

    // Create
    const onCreate = (formTitle, formDesc, questions) => {
        const newForm = {
            id: nextSurveyId.current,
            formTitle: formTitle,
            formDesc: formDesc,
            questions: [...questions],
        };
        formData === []
            ? setFormData([newForm])
            : setFormData([...formData, newForm]);

        // send newSurvey to database
        const options = { headers: { "Content-Type": "application/json" } };
        const newSurvey = {
            // surveyPk: nextSurveyId.current,
            surveyTitle: formTitle,
            surveyDescription: formDesc,
            questions: JSON.stringify([...questions]),
            userId: "asdf", // 로그인 한 사람 아이디 동적으로 바뀌게 수정 필요
        };
        console.log("Axios newsurey : ", newSurvey);
        axios
            .post("/api/survey/create", newSurvey, options)
            .then((response) => {})
            .catch((err) => {
                console.log(err);
            });
        nextSurveyId.current += 1;
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <FormStateContext.Provider value={formData}>
                <IdContext.Provider value={nextSurveyId}>
                    <FormHandlingContext.Provider value={{ onCreate }}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="about" element={<About />} />
                                    <Route
                                        path="create"
                                        element={<CreateSurvey />}
                                    />
                                    <Route
                                        path="survey/:id"
                                        element={<Survey />}
                                    />
                                    <Route
                                        path="register"
                                        element={<RegisterForm />}
                                    />
                                    <Route
                                        path="login"
                                        element={<LoginForm />}
                                    />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </FormHandlingContext.Provider>
                </IdContext.Provider>
            </FormStateContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
