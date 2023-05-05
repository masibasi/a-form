import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function RadioButton(props) {
    function addSelection() {
        props.questions[props.qIndex].selections.push({ type: "LETTER", content: "" });
        props.setQuestions([...props.questions]);
    }

    function delSelection() {
        props.questions[props.qIndex].selections.pop();
        props.setQuestions([...props.questions]);
    }

    return (
        <Form.Group className="RadioButton">
            {props.q.selections.map((item, index) => (
                <div key={`question-${props.qIndex}-${index}`} className="mb-3">
                    <InputGroup>
                        <InputGroup.Checkbox disabled type={"radio"} name={`radio-${props.qIdex}`} id={`radio-${props.qIndex}-${index}`} />
                        <Form.Control
                            value={props.q.selections[index].content}
                            placeholder="Enter selection"
                            onChange={(e) => {
                                props.q.selections[index].content = e.target.value;
                                props.setQuestions([...props.questions]);
                            }}
                        />
                    </InputGroup>
                </div>
            ))}
            <div className="form-selection-btn-wrapper">
                <Button onClick={addSelection}>Add Selection</Button>
                <Button className="deleteSelection-btn" onClick={delSelection}>
                    Delete Selection
                </Button>
            </div>
        </Form.Group>
    );
}

export default RadioButton;
