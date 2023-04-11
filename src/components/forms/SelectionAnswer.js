import React from "react";
import Form from "react-bootstrap/Form";
import "../../App.css";

function SelectionAnswer(props) {

  return (
    <Form.Group>
      <div className="mb-3">
        {props.q.item.map((item, index) => (
          <Form.Check
            type={props.type}
            id={`checkbox-${props.qIndex}-${index}`}
            key={`checkbox-${props.qIndex}-${index}`}
            name={`checkbox-${props.qIndex}`}
            label={item}
            onChange={(e) => {
              if(props.type === "radio") {
                for(let i = 0; i < props.answer.length; i++) {
                  props.answer[i] = false;
                }
              }
              props.answer[index] = e.target.checked;
            }}
          />
        ))}
      </div>
    </Form.Group>
  );
}

export default SelectionAnswer;
