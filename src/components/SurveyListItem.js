import React from "react";
import AB from "../assets/images/AB.png";
import { useNavigate } from "react-router-dom";
import "./SurveyListItem.css";
export const SurveyListItem = (props) => {
    const navigate = useNavigate();
    return (
        <div className="SurveyListItem" onClick={() => navigate(`/details/${props.id}`)}>
            <p className="surveyTitle">{props.title}</p>
            <p className="author">작성자 : {props.author}</p>
            <p className="date">{props.date}</p>
            <p className={`status ${props.status}`}>{props.status}</p>
        </div>
    );
};
export const HotCategory = (props) => {
    return (
        <div className="SurveyListItem">
            <p className="surveyTitle">{props.category}</p>
        </div>
    );
};

export const HotAvsBSurvey = (props) => {
    return (
        <div className="HotAvsBSurvey  hvr-glow">
            <img src={props.img} alt="" />
            <p className="AvsBTitle">{props.title}</p>
        </div>
    );
};

SurveyListItem.defaultProps = {
    title: "제목",
    date: "2023. 04. 15",
    status: "OPEN",
    author: "작성자",
};
HotCategory.defaultProps = {
    category: "분야 예시 1",
};
HotAvsBSurvey.defaultProps = {
    img: AB,
    title: "설문1",
};
