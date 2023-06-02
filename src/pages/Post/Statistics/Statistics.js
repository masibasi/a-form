import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Statistics.css";
import { PostContext } from "../../../services/post/post.context";
import { GetStats } from "../../../services/survey/survey.service";
import StatList from "./StatList";
import { SurveyContext } from "../../../services/survey/survey.context";
import StatListItem from "./StatListItem";

export const Statistics = () => {
  const { postPk } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const { GetPost } = useContext(PostContext);
  const { GetStats } = useContext(SurveyContext);
  const [statistics, setStatistics] = useState(null);
  const [postId, setPostId] = useState("");

  const fetchPostData = async () => {
    const post = await GetPost(postPk);
    console.log("post : ", post);
    setPostTitle(post.postTitle);
    setPostId(post.postSurvey);
  };

  useEffect(() => {
    fetchPostData();
  }, [postPk]); // 포스트 이름 불러오기

  const fetchData = async () => {
    const result = await GetStats(postId);
    console.log("postId", postId);
    setStatistics(result);
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
            <StatList statistics={statistics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
