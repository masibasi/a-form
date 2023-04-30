import React from "react";
import { FaGithub } from "react-icons/fa";
import Logo2 from "../assets/images/logo2.png";
import "./About.css";

export default function About() {
    return (
        <div className="About">
            <div className="page1">
                <img src={Logo2} />
                <h4>
                    <span className="A">A</span>mazing Form <br />
                    <span className="A">A</span>utomatical Form <br /> By team{" "}
                    <span className="A">A</span>CCELER !
                </h4>
            </div>{" "}
            Developed by:
            <a href="https://acceler.kr">Team ACCELER</a>
            <FaGithub size={24} href="https://github.com/KEA-ACCELER/a-form" />
        </div>
    );
}
