import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigation = useNavigate();
    return (
        <div className="Home">
            <h1>A-Form</h1>
            <p>An online form for everyone</p>
            <Button onClick={() => navigation("/create")}>
                Create Form
            </Button>{" "}
            <Button
                onClick={() => navigation("/about")}
                variant="outline-primary"
            >
                About Form
            </Button>
        </div>
    );
}
