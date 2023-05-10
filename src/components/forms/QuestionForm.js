import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import RadioButton from "./RadioButton";
import ShortForm from "./ShortForm";
import Checkbox from "./Checkbox";
import ShortFormAnswer from "./ShortFormAnswer";
import SelectionAnswer from "./SelectionAnswer";
import FadeIn from "react-fade-in/lib/FadeIn";
import "./QuestionForm.css";
function QuestionForm(props) {
    const questionType = props.type;

    const DeleteBtn = React.memo(({ props }) => {
        return (
            <Button
                className="delete-btn"
                variant="outline-danger"
                onClick={(e) => {
                    props.delQuestion(props.qIndex);
                }}
            >
                X
            </Button>
        );
    });

    return (
        <FadeIn className="QuestionForm hvr-float" style={{ maxWidth: "1024px" }}>
            <Card className="QuesionFormCard">
                <Card.Body>
                    <div className="top-wrapper">
                        <Card.Title>
                            {props.forCreate ? (
                                <input
                                    className="formtitle"
                                    type="text"
                                    value={props.q.title}
                                    placeholder="New Survey Card"
                                    onChange={(e) => {
                                        props.setQuestions(
                                            props.questions.map((form) =>
                                                form.id === props.qIndex
                                                    ? {
                                                          ...form,
                                                          title: e.target.value,
                                                      }
                                                    : form
                                            )
                                        );
                                    }}
                                />
                            ) : (
                                <div className="formtitle">{props.q.title}</div>
                            )}
                        </Card.Title>
                        {props.forCreate && <DeleteBtn props={props} />}
                    </div>

                    {props.forCreate ? (
                        <div className="questionType">
                            {questionType === "RADIO" && <RadioButton q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
                            {questionType === "CHECKBOX" && <Checkbox q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
                            {questionType === "SHORTFORM" && <ShortForm q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
                        </div>
                    ) : (
                        <div className="questionType">
                            {questionType === "RADIO" && <SelectionAnswer type={"RADIO"} q={props.q} qIndex={props.qIndex} answer={props.answer} />}
                            {questionType === "CHECKBOX" && <SelectionAnswer type={"CHECKBOX"} q={props.q} qIndex={props.qIndex} answer={props.answer} />}
                            {questionType === "SHORTFORM" && <ShortFormAnswer q={props.q} qIndex={props.qIndex} answer={props.answer} />}
                        </div>
                    )}
                </Card.Body>
            </Card>
        </FadeIn>
    );
}
function qPropsAreEqual(prev, next) {
    return prev.type === next.type && prev.q === next.q && prev.questions === next.questions;
}
export default React.memo(QuestionForm, qPropsAreEqual);
