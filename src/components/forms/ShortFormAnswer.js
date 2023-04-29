import React, { useState } from "react";
import Form from "react-bootstrap/Form";

//주관식
function ShortFormAnswer(props) {
    const [answer, setAnswer] = useState(props.q.item[0]);

    const onChange = (e) => {
        setAnswer(e.target.value);
        props.answer[0] = e.target.value;
    };

    return (
        <Form.Group>
            <Form.Control
                className="shortform-input"
                as="textarea"
                rows={4}
                value={answer}
                onChange={onChange}
            />
        </Form.Group>
    );
}

export default ShortFormAnswer;
