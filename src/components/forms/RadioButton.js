import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RadioButton(props) {
  function addSelection() {
    props.questions[props.qIndex].item.push("");
    props.setQuestions([ ...props.questions ]);
  }

  function delSelection() {
    props.questions[props.qIndex].item.pop();
    props.setQuestions([ ...props.questions ]);
  }

  return (
    <Form.Group>
      {props.q.item.map((item, index) => (
        <div key={`question-${props.qIndex}-${index}`} className="mb-3">
          <InputGroup>
            <InputGroup.Checkbox
              disabled
              type={"radio"}
              name={`radio-${props.qIdex}`}
              id={`radio-${props.qIndex}-${index}`}
            />
            <Form.Control value={props.q.item[index]} placeholder="Enter selection" onChange={(e) => {
              props.q.item[index] = e.target.value;
              props.setQuestions([ ...props.questions ]);
            }} />
          </InputGroup>
        </div>
      ))}
      <Button onClick={addSelection}>Add Selection</Button>
      <Button onClick={delSelection}>Delete Selection</Button>
    </Form.Group>
  )
}

export default RadioButton