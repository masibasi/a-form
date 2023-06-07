import React, { useContext } from "react";
import AB from "../../assets/images/AB.png";
import { useNavigate } from "react-router-dom";
import "./SurveyListItem.css";
import { Badge } from "react-bootstrap";
import { SurveyContext } from "../../services/survey/survey.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const SurveyListItem = (props) => {
  const navigate = useNavigate();
  // console.log(props);
  const { GetMyAnswer } = useContext(SurveyContext);
  const { userData, userToken } = useContext(AuthenticationContext);

  const handleClick = async () => {
    if (props.surveyType === "AB" && props.type === "post") {
      navigate(`/post/${props.id}`, { state: { id: props.id } });
    } else if (props.surveyType === "AB") {
      navigate(`/createAvsB/`, { state: { id: props.id } });
    } else if (props.type === "answered") {
      const myAnswer = await GetMyAnswer(props.id, userToken);
      console.log("my answer: ", myAnswer);
      navigate(`/survey/${props.id}`, { state: { id: props.id } });
    } else if (props.type === "popular") {
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
      <div className="itemLeftWrapper">
        <div className="badgeWrapper">
          <Badge className="categoryBadge" bg={props.surveyType === "AB" ? "info" : "primary"} key={1234}>
            {props.surveyType === "AB" ? "AvsB" : props.surveyType === "NORMAL" ? "Normal" : null}
          </Badge>
        </div>
        <span className="surveyTitle">{props.title}</span>
      </div>
      <div className="itemRightWrapper">
        {props.type === "post" ? <span className="author">작성자 : {props.author}</span> : <span className="author">작성자 : {props.author}</span>}

        {props.type === "post" && (
          <div className="dateWrapper">
            <span className="postStartDate">
              <div className="startdate">시작날짜</div>
              <div>
                {props.postStartDate[0]}년 {props.postStartDate[1]}월 {props.postStartDate[2]}일
              </div>
              <div>
                {props.postStartDate[3]}시 {props.postStartDate[4]}분
              </div>
            </span>
            <span className="postDueDate">
              <div className="duedate">마감날짜</div>
              <div>
                {props.postDueDate[0]}년 {props.postDueDate[1]}월 {props.postDueDate[2]}일
              </div>
              <div>
                {props.postDueDate[3]}시 {props.postDueDate[4]}분
              </div>
            </span>
          </div>
        )}
      </div>
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

SurveyListItem.defaultProps = {
  title: "제목",
  author: "작성자",
};
HotCategory.defaultProps = {
  category: "분야 예시 1",
};
