import React from "react";
import AB from "../../assets/images/AB.png";
import { useNavigate } from "react-router-dom";
import "./SurveyListItem.css";
export const SurveyListItem = (props) => {
    const navigate = useNavigate();
    return (
        <div
            className="SurveyListItem"
            onClick={() => {
                navigate(`/create`, { state: { id: props.id } });
            }}
        >
            <span className="surveyTitle">{props.title}</span>
            <span className="author">작성자 : {props.author}</span>
            <span className="date">{props.date}</span>
            <span className={`status ${props.status}`}>{props.status}</span>
        </div>
    );
};
export const HotCategory = (props) => {
    return (
        <div className="SurveyListItem">
            <span className="surveyTitle">{props.category}</span>
        </div>
    );
};

export const HotAvsBSurvey = (props) => {
    return (
        <div className="HotAvsBSurvey  hvr-glow">
            <img src={props.img} alt="" />
            <span className="AvsBTitle">{props.title}</span>
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
