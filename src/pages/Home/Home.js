import React from "react";
import { Button, Dropdown, DropdownButton, Fade } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import FadeIn from "react-fade-in";

import Bg from "../../assets/images/3D_survey1.png";
import "./Home.css";

export default function Home() {
    const navigation = useNavigate();

    return (
        <>
            <div className="Home">
                <FadeIn className="homeLeftWrapper" delay={100} transitionDuration={800}>
                    <h1 className="title">Welcome to our A-Form</h1>
                    <p className="catchPhrase">An online form for everyone</p>
                    <div className="homeBtnWrapper">
                        <Button className="homeBtn hvr-grow" onClick={() => navigation("/community")}>
                            Do Survey
                        </Button>
                        <DropdownButton className="homeBtn hvr-grow" variant="outline-primary" title={"Create Survey"}>
                            <Dropdown.Item eventKey="1" onClick={() => navigation("/create")}>
                                Normal Survey
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="1" onClick={() => navigation("/AvsB")}>
                                AvsB
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </FadeIn>

                <FadeIn delay={300} transitionDuration={800} className="imgWrapper" childClassName="childClassName">
                    <img src={Bg} className="homeImg" alt="" />
                </FadeIn>
            </div>
        </>
    );
}
