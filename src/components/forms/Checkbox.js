import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../../App.css";


function Checkbox(props) {
  return (
    <Form.Group>
      {props.q.item.map((selection, index) => (
        <div key={`checkbox-${props.q.questionTitle}-${index}`} id="checkbox-red" style={{ display: "flex" }}>
          <InputGroup>
            <InputGroup.Checkbox
              abled
              type={"checkbox"}
              name={`checkbox-${props.q.questionTitle}`}
              id={`checkbox-${props.q.questionTitle}-${selection}`}
            />
            <Form.Control type="text" defaultValue={selection} placeholder="Enter selection" onChange={(e) => {
              props.q.item[index] = e.target.value;
            }} />
          </InputGroup>
        </div>
      ))}
      <Button onClick={() => {
        console.log(props.q.item);
        props.questions[props.q.id].item.push(null);
        props.setQuestions([...props.questions]);
      }}>Add Selection</Button>
    </Form.Group>
  )
}

export default Checkbox