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
        <Card.Title>{props.item.title}</Card.Title>
        <Card.Text>{props.item.description}</Card.Text>
        <div style={{ border: "", float: "right", width: "10%" }}>
            <input type="checkbox" name="essential" value="essential" /> essential 
        </div>
        <Button variant="outline-danger" onClick={(e)=>{props.delfunction(props.index)}}>X</Button>
          <div className="questionType">
            {questionType==1 && <RadioButton item={props.item} selItem={props.setItem}/>}
            {questionType==2 && <Checkbox/>}
            {questionType==3 && <ShortForm/>}
          </div>
      </Card.Body>
    </Card>
  )
}

export default QuestionForm