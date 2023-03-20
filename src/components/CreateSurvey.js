import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionForm from "./forms/QuestionForm";
import AddingOption from "./forms/AddingOption";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function CreateSurvey() {
    const [questions, setQuestions] = useState([]); //index, state(어떤 타입의 질문인지)
    const [surveyTitle, setSurveyTitle] = useState("");
    const [surveyDesc, setSurveyDesc] = useState("");
    const navigate = useNavigate();
    const nextId = useRef(0); // 데이터 아이디

    // TODO : X 표시를 누르면 해당 문제의 정보가 삭제된다.
    function delQuestion(index) {
        questions.splice(index, 1);
        nextId.current -= 1;
        setQuestions([...questions]);
    }

    function addQuestion(input) {
        if (questions == null) {
            questions.push({
                questionType: input,
                questionTitle: "",
                item: [],
                id: nextId.current,
            });
        } else {
            questions.push({
                questionType: input,
                questionTitle: "",
                item: [],
                id: nextId.current,
            });
        }
        nextId.current += 1;
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
                <input
                    className="surveyTitle"
                    type="text"
                    value={surveyTitle}
                    placeholder="Create Survey"
                    onChange={(e) => {
                        {
                            setSurveyTitle(e.target.value);
                        }
                    }}
                />
                <input
                    className="surveyDesc"
                    type="text"
                    value={surveyDesc}
                    placeholder="Survey Description"
                    onChange={(e) => {
                        {
                            setSurveyDesc(e.target.value);
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
