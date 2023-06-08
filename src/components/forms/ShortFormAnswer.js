import React, { useState } from "react";
import Form from "react-bootstrap/Form";

//주관식
function ShortFormAnswer(props) {
    if (props.q.selections.length === 0) {
        props.q.selections.push({ type: "LETTER", content: "" });
    }
    const [answer, setAnswer] = useState(props.q.selections[0].content);

    const myAnswer = props.myAnswer[props.qIndex];

    const onChange = (e) => {
        setAnswer(e.target.value);
        props.answer[0] = e.target.value;
    };

    return (
        <Form.Group>
            <Form.Control className="shortform-input" as="textarea" rows={4} value={props.forCheck ? myAnswer : answer} onChange={onChange} disabled={props.forCheck} />
        </Form.Group>
    );
}

export default ShortFormAnswer;
