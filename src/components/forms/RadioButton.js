import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RadioButton(props) {
  function addSelection() {
    props.questions[props.q.id].item.push(null);
    props.setQuestions([ ...props.questions ]);
  }

  function delSelection() {
    props.questions[props.q.id].item.pop();
    props.setQuestions([ ...props.questions ]);
  }

  return (
    <Form.Group>
      {props.q.item.map((item, index) => (
        <div key={`question-${props.q.id}-${index}`} className="mb-3" style={{ display: "flex" }}>
          <InputGroup>
            <InputGroup.Checkbox
              disabled
              type={"radio"}
              name={`radio-${props.q.id}`}
              id={`radio-${props.q.id}-${index}`}
            />
            <Form.Control type="text" defaultValue={item} placeholder="Enter selection" onChange={(e) => {
              props.q.item[index] = e.target.value;
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