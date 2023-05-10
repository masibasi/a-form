import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import QuestionForm from "../../components/forms/QuestionForm";
import { SurveyContext } from "../../services/survey/survey.context";

import Button from "react-bootstrap/Button";

import FadeIn from "react-fade-in/lib/FadeIn";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export default function Survey() {
    const { GetSurveyById, PostSurveyAnswer } = useContext(SurveyContext);
    const { userToken } = useContext(AuthenticationContext);
    const [surveyData, setSurveyData] = useState({
        title: "Default Survey Title",
        description: "Default survey description",
        createdAt: "",
        updatedAt: "",
        deadline: "",
        questions: [""],
        statistics: [],
        author: 0,
        _id: "",
    });
    const [surveyAnswer, setSurveyAnswer] = useState();
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();

    //Get Survey Data
    const getSurveyData = async () => {
        let data = await GetSurveyById(id);
        setSurveyData(data.data);
        setAnswerForm(data.data);
        console.log(data.data);
        setLoaded(true);
    };
    useEffect(() => {
        getSurveyData();
    }, []);
    //Set AnswerForm
    const setAnswerForm = (data) => {
        let answerForm = {
            survey: data._id,
            // userPk: data.author,
            answers: Array.from({ length: data.questions.length }, (_, i) =>
                Array.from(
                    {
                        length: data.questions[i].selections.length,
                    },
                    () => false
                )
            ),
        };
        console.log("answerform", answerForm);
        setSurveyAnswer(answerForm);
    };

    const handleSubmit = async () => {
        console.log(JSON.stringify(surveyAnswer));
        const result = await PostSurveyAnswer(surveyAnswer, userToken);
        alert(result);
    };

    return (
        <>
            {loaded ? (
                <div className="Survey">
                    <FadeIn className="surveyWrapper" childClassName="childClassName">
                        <div className="text-wrapper">
                            <div className="surveyTitle">{surveyData.title}</div>
                            <div className="surveyDesc">{surveyData.description}</div>
                        </div>
                        <Form className="Form" onSubmit={handleSubmit}>
                            {surveyData.questions &&
                                surveyData.questions.map((q, index) => {
                                    return <QuestionForm forCreate={false} type={q.type} q={q} qIndex={index} key={q._id} answer={surveyAnswer.answers[index]} />;
                                })}
                        </Form>
                        <div className="ButtonWrapper">
                            <div className="SurveyBtnWrapper">
                                <Button className="submit-btn" type="submit" variant="outline-success" onClick={handleSubmit}>
                                    Submit Answer
                                </Button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            ) : null}
        </>
    );
}
