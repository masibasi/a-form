import React , {useState} from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {useNavigate} from "react-router-dom";

import RadioButton from './RadioButton'
import ShortForm from './ShortForm'
import Checkbox from './Checkbox'

function QuestionForm(props) {
  const navigate = useNavigate();
  const questionType = props.questiontype;

  return (
    <Card style={{ maxWidth: "1024px" }}>
      <Card.Body>
        <Card.Title>{props.q.questionTitle}</Card.Title>
        <Button variant="outline-danger" onClick={(e)=>{props.delfunction(props.q.id)}}>X</Button>
          <div className="questionType">
            {questionType==1 && <RadioButton q={props.q} questions={props.questions} setQuestions={props.setQuestions}/>}
            {questionType==2 && <Checkbox/>}
            {questionType==3 && <ShortForm/>}
          </div>
      </Card.Body>
    </Card>
  )
}

export default QuestionForm