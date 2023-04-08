import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import CreateSurvey from "./components/CreateSurvey";
import About from "./components/About";
import RegisterForm from "./components/RegisterForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const FormHandlingContext = React.createContext();
export const FormStateContext = React.createContext();

function App() {
    const nextSurveyId = useRef(0); // 전체 forms 의 id를 관리하는 변수
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
        nextSurveyId.current += 1;
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <FormStateContext.Provider value={formData}>
            <FormHandlingContext.Provider value={{ onCreate }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="create" element={<CreateSurvey />} />
                            <Route path="register" element={<RegisterForm />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </FormHandlingContext.Provider>
        </FormStateContext.Provider>
    );
}

export default App;
