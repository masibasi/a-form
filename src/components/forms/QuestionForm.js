import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import RadioButton from "./RadioButton";
import ShortForm from "./ShortForm";
import Checkbox from "./Checkbox";
import ShortFormAnswer from "./ShortFormAnswer";
import SelectionAnswer from "./SelectionAnswer";

function QuestionForm(props) {
    const questionType = props.type;

    return (
        <Card className="QuestionForm" style={{ maxWidth: "1024px" }}>
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
                    {props.forCreate && (
                        <Button
                            className="delete-btn"
                            variant="outline-danger"
                            onClick={(e) => {
                                props.delQuestion(props.qIndex);
                            }}
                        >
                            X
                        </Button>
                    )}
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
    );
}

export default QuestionForm;
