import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Switch from "react-switch";
import RadioButton from "./RadioButton";
import ShortForm from "./ShortForm";
import Checkbox from "./Checkbox";
import ShortFormAnswer from "./ShortFormAnswer";
import SelectionAnswer from "./SelectionAnswer";
import "./QuestionForm.css";
import FadeIn from "../../animation/FadeIn";
function QuestionForm(props) {
  const questionType = props.type;

  const DeleteBtn = React.memo(({ props }) => {
    function toggleRequired() {
      const newQuestions = [...props.questions];
      newQuestions[props.qIndex].isRequired = !newQuestions[props.qIndex].isRequired;
      props.setQuestions(newQuestions);
      console.log(`isRequired for question ${props.q.id} is now ${props.q.isRequired} and its type is ${typeof props.q.isRequired}`);
    } // 버튼이 눌릴때마다 false, true값이 바뀐다

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <label className="required_option_toggle">
          <span style={{ marginRight: "10px" }}>{props.q.isRequired ? "Required" : "Optional"}</span>
          <Switch onChange={toggleRequired} checked={props.q.isRequired} />
        </label>
        <Button
          className="delete-btn"
          variant="outline-danger"
          onClick={(e) => {
            props.delQuestion(props.qIndex);
          }}
        >
          X
        </Button>
      </div>
    );
  });

  return (
    <FadeIn className="QuestionForm hvr-float" style={{ maxWidth: "1024px" }} childClassName="childClassName">
      <Card
        className="QuesionFormCard"
        style={props.q.isRequired ? { boxShadow: " rgba(28, 88, 66, 0.6) 0px 4px 4px 0px" } : { boxShadow: "rgba(100, 100, 111, 0.2) 0px 4px 4px 0px" }}
      >
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
