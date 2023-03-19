import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import RadioButton from "./RadioButton";
import ShortForm from "./ShortForm";
import Checkbox from "./Checkbox";

function QuestionForm(props) {
  const questionType = props.questionType;

  return (
    <Card style={{ maxWidth: "1024px" }}>
      <Card.Body>
        <Card.Title>{props.q.questionTitle}</Card.Title>
        <Button
          variant="outline-danger"
          onClick={(e) => {
            props.delQuestion(props.qIndex);
          }}
        >
          X
        </Button>
        <div className="questionType">
          {questionType === 1 && (
            <RadioButton
              q={props.q}
              qIndex={props.qIndex}
              questions={props.questions}
              setQuestions={props.setQuestions}
            />
          )}
          {questionType === 2 && (
            <Checkbox
              q={props.q}
              qIndex={props.qIndex}
              questions={props.questions}
              setQuestions={props.setQuestions}
            />
          )}
          {questionType === 3 && (
            <ShortForm
              q={props.q}
              qIndex={props.qIndex}
              questions={props.questions}
              setQuestions={props.setQuestions}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default QuestionForm;
