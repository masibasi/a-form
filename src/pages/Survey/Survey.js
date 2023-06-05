import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../../components/forms/QuestionForm";
import { SurveyContext } from "../../services/survey/survey.context";

import Button from "react-bootstrap/Button";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import FadeIn from "../../animation/FadeIn";

export default function Survey() {
    const navigate = useNavigate();
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
            answers: Array.from({ length: data.questions.length }, (_, i) => []),
        };
        console.log("answerform", answerForm);
        setSurveyAnswer(answerForm);
    };

    const handleSubmit = async () => {
        // 모든 필수항목이 답변되었는지 확인
        for (let i = 0; i < surveyData.questions.length; i++) {
            console.log(`Question ${i + 1} is required: ${surveyData.questions[i].isRequired}`);

            // RADIO or CHECKBOX
            if (surveyData.questions[i].type === "RADIO" || surveyData.questions[i].type === "CHECKBOX") {
                // 필수항목이고 모든 value값이 false일때
                if (surveyData.questions[i].isRequired && (!surveyAnswer.answers[i] || surveyAnswer.answers[i].every((answer) => answer === false))) {
                    alert("Please answer all required questions.");
                    return;
                }
            }
            // SHORTFORM
            else if (surveyData.questions[i].type === "SHORTFORM") {
                if (surveyData.questions[i].isRequired && (!surveyAnswer.answers[i] || surveyAnswer.answers[i].length === 0)) {
                    alert("Please answer all required questions.");
                    return;
                }
            }
        }

        // 모든 필수 응답이 답변되었을때 제출 가능
        try {
            // Survey Answer 값이 [true , false, true]이면 [0,2]로 변경해주어야 한다.
            surveyAnswer.answers = surveyAnswer.answers.map((answer, index) => {
                if (typeof surveyAnswer.answers[index][0] === "string") {
                    // shortform은 내버려 둔다
                    return answer;
                } else {
                    // 선택지가 있는 문제일경우 변환
                    return answer.map((selection, i) => (selection ? i : -1)).filter((i) => i !== -1);
                }
            });
            console.log(JSON.stringify(surveyAnswer));
            const result = await PostSurveyAnswer(surveyAnswer, surveyData._id, userToken);
            alert("답변이 저장되었습니다.");
            navigate(-1);
        } catch (error) {
            console.error(error);
            // handle error here
        }
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
                                    console.log(`Question ${index + 1} is required: ${q.isRequired}`);
                                    return (
                                        <QuestionForm
                                            forCreate={false}
                                            type={q.type}
                                            q={q}
                                            qIndex={index}
                                            key={q._id}
                                            answer={surveyAnswer.answers[index]}
                                            style={q.isRequired ? { boxShadow: " rgba(28, 88, 66, 0.6) 0px 4px 4px 0px" } : { boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 4px 0px" }} //필수항목 초록색 그림자
                                        />
                                    );
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
