import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
//주관식
function ShortForm(props) {


  const textRef = React.useRef();
  const [answer, setAnswer] = useState("");
  const onChange = (e) => {
    setAnswer(e.target.value);
  };
  React.useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "100px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [answer]);

  return (
    <div>
      
        <Form.Group>
          <Form.Control as="textarea" onChange={onChange} ref={textRef} />
        </Form.Group>
    </div>
  );
}

export default ShortForm;
