import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RadioButton(props) {
  return (
    <Form.Group>
      {props.item.selection.map((selection, index) => (
        <div key={`radio-${props.item.title}-${index}`} className="mb-3" style={{ display: "flex" }}>
          <InputGroup>
            <InputGroup.Checkbox
              disabled
              type={"radio"}
              name={`radio-${props.item.title}`}
              id={`radio-${props.item.title}-${selection}`}
            />
            <Form.Control type="text" defaultValue={selection} placeholder="Enter selection" onChange={(e) => {
              props.item.selection[index] = e.target.value;
            }} />
          </InputGroup>
        </div>
      ))}
      <Button onClick={() => {
        console.log(props.item);
        props.setItem({
          ...props.item,
          selection: [...props.item.selection, null],
        });
      }}>Add Selection</Button>
    </Form.Group>
  )
}

export default RadioButton