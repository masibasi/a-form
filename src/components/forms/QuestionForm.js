import React from "react";
import Card from "react-bootstrap/Card"
import RadioButton from "./RadioButton";

function QuestionForm(props) {
  return (
    <Card style={{ maxWidth: "1024px" }}>
      <Card.Body>
        <Card.Title>{props.item.title}</Card.Title>
        <Card.Text>{props.item.description}</Card.Text>
        <RadioButton item={props.item} setItem={props.setItem} />
      </Card.Body>
    </Card>
  )
}

export default QuestionForm