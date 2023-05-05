import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

//주관식
function ShortForm(props) {
    if (props.q.selections.length === 0) {
        props.q.selections.push({ type: "LETTER", content: "" });
    }

    const textRef = React.useRef();
    const [answer, setAnswer] = useState("");

    const onChange = (e) => {
        setAnswer(e.target.value);
        props.q.selections[0].content = e.target.value;
    };

    useEffect(() => {
        if (textRef && textRef.current) {
            const taHeight = textRef.current.scrollHeight;
            textRef.current.style.height = taHeight + "px";
        }
    }, [answer]);

    return (
        <Form.Group>
            <Form.Control className="shortform-input" as="textarea" rows={4} value={props.q.selections[0].content} onChange={onChange} ref={textRef} />
        </Form.Group>
    );
}

export default ShortForm;
