import React, { useNavigate } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import RadioButton from "./RadioButton";
import ShortForm from "./ShortForm";
import Checkbox from "./Checkbox";

function QuestionForm(props) {
  const questionType = props.questionType;
  let formData = props.q;
  return (
    <Card className="QuestionForm" style={{ maxWidth: "1024px" }}>
      <Card.Body>
        <div className="top-wrapper">
          <Card.Title>
            <input
              className="formtitle"
              type="text"
              value={props.q.questionTitle}
              placeholder="New Survey Card"
              onChange={(e) => {
                {
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
                }
              }}
            />
          </Card.Title>
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
        <div className="questionType">
          {questionType === 1 && <RadioButton q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
          {questionType === 2 && <Checkbox q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
          {questionType === 3 && <ShortForm q={props.q} qIndex={props.qIndex} questions={props.questions} setQuestions={props.setQuestions} />}
        </div>
      </Card.Body>
    </Card>
  );
}

export default QuestionForm;
