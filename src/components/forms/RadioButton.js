import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RadioButton(props) {
  return (
    <Form.Group>
      {props.q.item.map((selection, index) => (
        <div key={`radio-${props.q.questionTitle}-${index}`} className="mb-3" style={{ display: "flex" }}>
          <InputGroup>
            <InputGroup.Checkbox
              disabled
              type={"radio"}
              name={`radio-${props.q.questionTitle}`}
              id={`radio-${props.q.questionTitle}-${selection}`}
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

export default RadioButton