import React, { useState, useEffect, useRef, useContext } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "./forms/QuestionForm";
import AddingOption from "./forms/AddingOption";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Axios from "axios";

export default function Survey() {
    const [data, setData] = useState({});
    const [surveyAnswer, setSurveyAnswer] = useState();
    const { id } = useParams();

    useEffect(() => {
        Axios
            .get(`http://localhost:8080/api/survey/${id}`)
            .then((response) => {
                response.data = {
                    ...response.data,
                    questions: JSON.parse(response.data.questions),
                };
                setData(response.data);

                let answerForm = {
                    surveyPk: response.data.surveyPk,
                    userPk: response.data.author,
                    answer: Array.from({ length: response.data.questions.length }, (_, i) =>
                        Array.from(
                            { length: response.data.questions[i].item.length },
                            () => false
                        )
                    ),
                };
                console.log(answerForm);
                setSurveyAnswer(answerForm);
                console.log("response : ", response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // 일단 axios로 값을 받았다고 가정하고 설정
        // let response = {
        //     surveyPk: 1,
        //     surveyTitle: "test",
        //     surveyDescription: "test survey",
        //     questions:
        //         '[{"id": 0,"questionTitle": "test question","questionType": 1, "item": ["test1", "test2", "test3"]},{"id": 1,"questionTitle": "test question2","questionType": 2,"item": ["test4", "test5", "test6"]},{"id": 3,"questionTitle": "test question3","questionType": 3,"item": ["test4"]}]',
        //     author: 1,
        // };

        // response = {
        //     ...response,
        //     questions: JSON.parse(response.questions),
        // };
        // setData(response);

        // let answerForm = {
        //     surveyPk: response.surveyPk,
        //     userPK: 1,
        //     answer: Array.from({ length: response.questions.length }, (_, i) =>
        //         Array.from(
        //             { length: response.questions[i].item.length },
        //             () => false
        //         )
        //     ),
        // };
        // console.log(answerForm);
        // setSurveyAnswer(answerForm);
    }, []);

    function handleSubmit(e) {
        // 버튼누르면 응답 제출
        e.preventDefault();
        surveyAnswer.answer = JSON.stringify(surveyAnswer.answer);
        console.log(surveyAnswer);

        Axios.post("http://localhost:8080/api/surveyAnswer", surveyAnswer, {headers: {
          "Content-Type": "application/json"
        }}).then(response => {
            console.log(response.data)
        }).catch((err) => { console.log(err) });
    }

    return (
        <Container className="CreateSurvey">
            <div className="text-wrapper">
                <div className="surveyTitle">{data.surveyTitle}</div>
                <div className="surveyDesc">{data.surveyDescription}</div>
            </div>
            <Form className="Form" onSubmit={handleSubmit}>
                <div className="ButtonWrapper">
                    <div className="SurveyBtnWrapper">
                        <Button
                            className="submit-btn"
                            type="submit"
                            variant="outline-success"
                        >
                            Submit Answer
                        </Button>
                    </div>
                </div>
                {data.questions &&
                    data.questions.map((q, index) => {
                        return (
                            <QuestionForm
                                forCreate={false}
                                questionType={q.questionType}
                                q={q}
                                qIndex={index}
                                key={q.id}
                                answer={surveyAnswer.answer[index]}
                            />
                        );
                    })}
            </Form>
        </Container>
    );
}
