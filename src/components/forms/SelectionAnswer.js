import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../App.css";

function SelectionAnswer(props) {
    const myAnswer = props.myAnswer[props.qIndex];
    useEffect(() => {
        console.log("props.myAnswer", props.myAnswer);
    }, [myAnswer]);

    return (
        <Form.Group>
            <div className="mb-3">
                {props.q.selections.map((item, index) => {
                    return (
                        <Form.Check
                            type={props.type}
                            id={`checkbox-${props.qIndex}-${index}`}
                            key={`checkbox-${props.qIndex}-${index}`}
                            name={`checkbox-${props.qIndex}`}
                            label={item.content}
                            disabled={props.forCheck}
                            checked={props.forCheck ? (myAnswer ? !(myAnswer.indexOf(index) === -1) : null) : props.answer[index]}
                            onChange={(e) => {
                                if (props.type === "RADIO") {
                                    for (let i = 0; i < props.answer.length; i++) {
                                        props.answer[i] = false;
                                    }
                                }
                                props.answer[index] = e.target.checked;
                            }}
                        />
                    );
                })}
            </div>
        </Form.Group>
    );
}

export default SelectionAnswer;
