import React from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FormList } from "../../components/FormList";
import Bg from "../../assets/images/form-bg.png";
import "./Home.css";
export default function Home() {
    const navigation = useNavigate();

    return (
        <div className="Home">
            <div className="homeTopWrapper">
                <div className="homeLeftWrapper">
                    <h1 className="title">Welcome to our A-Form</h1>
                    <p className="catchPhrase">An online form for everyone</p>
                    <div className="homeBtnWrapper">
                        <Button
                            className="homeBtn"
                            onClick={() => navigation("/community")}
                        >
                            Do Survey
                        </Button>
                        <DropdownButton
                            className="homeBtn"
                            variant="outline-primary"
                            title={"Create Survey"}
                        >
                            <Dropdown.Item
                                eventKey="1"
                                onClick={() => navigation("/create")}
                            >
                                Normal Survey
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="1"
                                onClick={() => navigation("/AvsB")}
                            >
                                AvsB
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <img src={Bg} className="homeImg" alt="" />
            </div>
            <FormList />
        </div>
    );
}
