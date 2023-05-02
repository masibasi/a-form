import React from "react";
import AB from "../assets/images/AB.png";

export const HotSurvey = (props) => {
    return (
        <div className="HotSurvey">
            <p className="surveyTitle">{props.title}</p>
            <p className="date">{props.date}</p>
            <p className={`status ${props.status}`}>{props.status}</p>
        </div>
    );
};

export const HotCategory = (props) => {
    return (
        <div className="HotSurvey">
            <p className="surveyTitle">{props.category}</p>
        </div>
    );
};

export const HotAvsBSurvey = (props) => {
    return (
        <div className="formWrapper">
            <img src={props.img} alt="" />
            <p className="AvsBTitle">{props.title}</p>
        </div>
    );
};

HotSurvey.defaultProps = {
    title: "제목",
    date: "2023. 04. 15",
    status: "OPEN",
};
HotCategory.defaultProps = {
    category: "분야 예시 1",
};
HotAvsBSurvey.defaultProps = {
    img: AB,
    title: "설문1",
};
