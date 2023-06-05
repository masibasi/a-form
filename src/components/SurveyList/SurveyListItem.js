import React from "react";
import AB from "../../assets/images/AB.png";
import { useNavigate } from "react-router-dom";
import "./SurveyListItem.css";
import { Badge } from "react-bootstrap";

export const SurveyListItem = (props) => {
    const navigate = useNavigate();
    // console.log(props);

    const handleClick = () => {
        if (props.surveyType == "AB") {
            navigate(`/createAvsB/`, { state: { id: props.id } });
        } else if (props.type === "answered" || props.type === "popular") {
            navigate(`/survey/${props.id}`, { state: { id: props.id } });
        } else if (props.type === "post" || props.type === "allpost") {
            navigate(`/post/${props.id}`);
            console.log(props);
        } else {
            navigate(`/create/`, { state: { id: props.id } });
        }
    };

    return (
        <div className="SurveyListItem" onClick={handleClick}>
            <div className="badgeWrapper">
                <Badge className="categoryBadge" bg={props.surveyType === "AB" ? "info" : "primary"} key={1234}>
                    {props.surveyType === "AB" ? "AB" : props.surveyType === "NORMAL" ? "Normal" : null}
                </Badge>
            </div>
            <span className="surveyTitle">{props.title}</span>
            <span className="author">작성자 : {props.author}</span>
            {props.type === "post" && (
                <>
                    <span className="postStartDate">
                        <div className="startdate">시작날짜</div>
                        {props.postStartDate[0]}년 {props.postStartDate[1]}월 {props.postStartDate[2]}일 {props.postStartDate[3]}시 {props.postStartDate[4]}분
                    </span>
                    <span className="postDueDate">
                        <div className="duedate">마감날짜</div>
                        {props.postDueDate[0]}년 {props.postDueDate[1]}월 {props.postDueDate[2]}일 {props.postDueDate[3]}시 {props.postDueDate[4]}분
                    </span>
                </>
            )}
        </div>
    );
};

export const HotCategory = (props) => {
    return (
        <div className="SurveyListItem">
            <span className="surveyTitle">{props.category == "" ? "빈칸" : props.category}</span>
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
    author: "작성자",
};
HotCategory.defaultProps = {
    category: "분야 예시 1",
};
HotAvsBSurvey.defaultProps = {
    img: AB,
    title: "설문1",
};
