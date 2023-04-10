import React, { useNavigate } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import RadioButton from "./RadioButton";
import ShortForm from "./ShortForm";
import Checkbox from "./Checkbox";
import ShortFormAnswer from "./ShortFormAnswer";
import SelectionAnswer from "./SelectionAnswer";

function QuestionForm(props) {
  const questionType = props.questionType;
  return (
    <Card className="QuestionForm" style={{ maxWidth: "1024px" }}>
      <Card.Body>
        <div className="top-wrapper">
          <Card.Title>
            {props.forCreate ? (
              <input
                className="formtitle"
                type="text"
                value={props.q.questionTitle}
                placeholder="New Survey Card"
                onChange={(e) => {
                  props.setQuestions(
                    props.questions.map((form) =>
                      form.id === props.qIndex
                        ? {
                          ...form,
                          questionTitle: e.target.value,
                        }
                        : form
                    )
                  );
                }}
              />
            ) : (
              <div className="formtitle">
                {props.q.questionTitle}
              </div>
            )}
          </Card.Title>
          {props.forCreate &&
            <Button
              className="delete-btn"
              variant="outline-danger"
              onClick={(e) => {
                props.delQuestion(props.qIndex);
              }}
            >
              X
            </Button>
          }
        </div>
        {props.forCreate ? (
          <div className="questionType">
            {questionType === 1 && <RadioButton q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
            {questionType === 2 && <Checkbox q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
            {questionType === 3 && <ShortForm q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
          </div>
        ) : (
          <div className="questionType">
            {questionType === 1 && <SelectionAnswer type={'radio'} q={props.q} qIndex={props.qIndex} answer={props.answer} />}
            {questionType === 2 && <SelectionAnswer type={'checkbox'} q={props.q} qIndex={props.qIndex} answer={props.answer} />}
            {questionType === 3 && <ShortFormAnswer q={props.q} qIndex={props.qIndex} answer={props.answer} />}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default QuestionForm;
