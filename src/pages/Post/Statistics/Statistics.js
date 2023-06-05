import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Statistics.css";
import { PostContext } from "../../../services/post/post.context";
import { GetStats } from "../../../services/survey/survey.service";
import StatList from "./StatList";
import { SurveyContext } from "../../../services/survey/survey.context";
import StatListItem from "./StatListItem";
// import { GetSurveyById } from "../../../services/survey/survey.service";

export const Statistics = () => {
  const { postPk } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const { GetPost } = useContext(PostContext);
  const { GetStats, GetSurveyById } = useContext(SurveyContext);
  const [statistics, setStatistics] = useState(null);
  const [postId, setPostId] = useState("");

  const [surveyData, setSurveyData] = useState(null);

  const fetchPostData = async () => {
    const post = await GetPost(postPk);
    console.log("post : ", post);
    setPostTitle(post.postTitle);
    setPostId(post.postSurvey);
    console.log("post.postSurvey : ", post.postSurvey);

    const survey = await GetSurveyById(post.postSurvey);
    console.log("survey : ", survey); // 이 부분을 수정해봅니다.
    setSurveyData(survey.data);
    console.log("setSurveyData: ", surveyData);
  };

  useEffect(() => {
    console.log("surveyData : ", surveyData);
  }, [surveyData]);

  useEffect(() => {
    fetchPostData();
  }, [postPk]); // 포스트 이름 불러오기

  const fetchData = async () => {
    const result = await GetStats(postId);
    setStatistics(result);
    console.log("stat: ", result);
  };

  useEffect(() => {
    if (postId !== "") fetchData();
  }, [postId]);

  return (
    <div className="Statistics">
      <div className="statistics_center">
        <div className="statistics_wrapper">
          <div className="statistics_h1">{postTitle}</div>
          <div className="stat">통계</div>
          <div className="surveyListWrapper">
            <StatList statistics={statistics} postId={postId} surveyData={surveyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
