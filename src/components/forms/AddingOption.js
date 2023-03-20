import React from "react";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";

function AddingOption(props) {
    return (
        <ButtonGroup aria-label="Basic example" className="AddingOption">
            <Button
                variant="outline-primary"
                onClick={(event) => {
                    props.addQuestion(1);
                }}
            >
                Radio
            </Button>
            <Button
                variant="outline-primary"
                onClick={(event) => {
                    props.addQuestion(2);
                }}
            >
                CheckBox
            </Button>
            <Button
                variant="outline-primary"
                onClick={(event) => {
                    props.addQuestion(3);
                }}
            >
                Shortform
            </Button>
        </ButtonGroup>
    );
}

export default AddingOption;
