import React from "react";
import { Button, Dropdown, DropdownButton, Fade } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Bg from "../../assets/images/3D_survey1.png";
import "./Home.css";
import FadeIn from "../../animation/FadeIn";

export default function Home() {
    const navigation = useNavigate();

    return (
        <>
            <div className="Home">
                <div className="page1">
                    <FadeIn className="homeLeftWrapper" delay={100} transitionDuration={800}>
                        <h1 className="title">The Next Generation of Survey</h1>
                        <p className="catchPhrase">설문의 모든것, 빠르고 간편하게</p>
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

                    <FadeIn delay={300} transitionDuration={800} className="imgWrapper">
                        <img src={Bg} className="homeImg" alt="" />
                    </FadeIn>
                </div>

                <div className="page2">
                    <Button id="about_btn" onClick={() => navigation("/about")}>
                        What is A-form?
                    </Button>
                </div>
            </div>
        </>
    );
}
