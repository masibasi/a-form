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
import { Form } from "./components/Form";
import axios from "axios";

export const FormHandlingContext = React.createContext();
export const FormStateContext = React.createContext();
export const AuthContext = React.createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn")
    );
    const nextSurveyId = useRef(0); // 전체 forms 의 id를 관리하는 변수
    const [formData, setFormData] = useState([]); //Form 전체 데이터 관리 state

    // Create
    const onCreate = (formTitle, formDesc, questions) => {
        const options = { headers: { "Content-Type": "application/json" } };
        const newForm = {
            id: nextSurveyId.current,
            formTitle: formTitle,
            formDesc: formDesc,
            questions: [...questions],
        };
        const newSurvey = {
            surveyPk: nextSurveyId.current,
            surveyTitle: formTitle,
            surveyDescription: formDesc,
            questions: [...questions],
        };
        formData === []
            ? setFormData([newForm])
            : setFormData([...formData, newForm]);
        // send newForm to database
        axios
            .post("/user/login", newSurvey, options)
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
                                <Route path="survey/:id" element={<Survey />} />
                                <Route
                                    path="register"
                                    element={<RegisterForm />}
                                />
                                <Route path="login" element={<LoginForm />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </FormHandlingContext.Provider>
            </FormStateContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
