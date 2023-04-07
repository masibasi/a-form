import React, { useState, useEffect, useRef, useContext } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionForm from "./forms/QuestionForm";
import AddingOption from "./forms/AddingOption";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FormHandlingContext } from "../App";

function CreateSurvey() {
    const [questions, setQuestions] = useState([]); //index, state(어떤 타입의 질문인지)
    const [formTitle, setFormTitle] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const navigate = useNavigate();
    const nextCardId = useRef(0); // surveyCard 아이디

    const { onCreate } = useContext(FormHandlingContext); // Form 작성 완료 handler를 context에서 불러온다

    const handleCreate = () => {
        if (formTitle == "") {
            alert("enter in a title");
            return;
        } else {
            onCreate(formTitle, formDesc, questions);
            navigate("/");
        }
    };
    // TODO : X 표시를 누르면 해당 문제의 정보가 삭제된다.
    function delQuestion(index) {
        questions.splice(index, 1);
        nextCardId.current -= 1;
        setQuestions([...questions]);
    }

    function addQuestion(input) {
        if (questions == null) {
            questions.push({
                questionType: input,
                questionTitle: "",
                item: [],
                id: nextCardId.current,
            });
        } else {
            questions.push({
                questionType: input,
                questionTitle: "",
                item: [],
                id: nextCardId.current,
            });
        }
        nextCardId.current += 1;
        setQuestions([...questions]);
    }

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(questions);
    }

    return (
        <Container className="CreateSurvey">
            <div className="text-wrapper">
                <div>
                    <input
                        className="surveyTitle"
                        type="text"
                        value={formTitle}
                        placeholder="Create Form"
                        onChange={(e) => {
                            {
                                setFormTitle(e.target.value);
                            }
                        }}
                    />
                </div>
                <input
                    className="surveyDesc"
                    type="text"
                    value={formDesc}
                    placeholder="Form Description"
                    onChange={(e) => {
                        {
                            setFormDesc(e.target.value);
                        }
                    }}
                />
            </div>
            <div className="ButtonWrapper">
                <AddingOption addQuestion={addQuestion}></AddingOption>
                <div className="SurveyBtnWrapper">
                    <Button
                        className="submit-btn"
                        type="submit"
                        variant="outline-success"
                        onClick={() => {
                            handleCreate();
                        }}
                    >
                        Create Survey
                    </Button>
                    <Button
                        className="delete-btn"
                        type="submit"
                        variant="outline-danger"
                        onClick={() => navigate("/", { replace: true })}
                    >
                        Delete Survey
                    </Button>
                </div>
            </div>
            <Form className="Form" onSubmit={handleSubmit}>
                {questions.map((q, index) => {
                    return (
                        <QuestionForm
                            questionType={q.questionType}
                            delQuestion={delQuestion}
                            q={q}
                            qIndex={index}
                            key={q.id}
                            questions={questions}
                            setQuestions={setQuestions}
                        />
                    );
                })}
            </Form>
        </Container>
    );
}

export default CreateSurvey;
