import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Statistics.css";
import { PostContext } from "../../../services/post/post.context";
import { SurveyContext } from "../../../services/survey/survey.context";
import { AIContext } from "../../../services/ai/ai.context";
import StatList from "./StatList";
import { Button, Spinner } from "react-bootstrap";
import { SiProbot } from "react-icons/si";
import { Firework } from "../../../animation/Firework";
import FadeIn from "../../../animation/FadeIn";

export const Statistics = () => {
  const { postPk } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const { GetPost } = useContext(PostContext);
  const { GetStats, GetSurveyById } = useContext(SurveyContext);
  const { GetAiAnalyse } = useContext(AIContext);
  const [statistics, setStatistics] = useState(null);
  const [stats, setStats] = useState(null);
  const [postId, setPostId] = useState("");

  const [surveyData, setSurveyData] = useState(null);
  const [aiIsLoading, setAiIsLoading] = useState(false);
  const [showAIRes, setShowAIRes] = useState(false);
  const [AIAnalyse, setAIAnalyse] = useState(null);

  const fetchPostData = async () => {
    const post = await GetPost(postPk);
    console.log("post : ", post);
    setPostTitle(post.postTitle);
    setPostId(post.postSurvey);

    const survey = await GetSurveyById(post.postSurvey);
    setSurveyData(survey.data);
  };

  useEffect(() => {
    console.log("surveyData : ", surveyData);
  }, [surveyData]);

  useEffect(() => {
    fetchPostData();
  }, [postPk]); // 포스트 이름 불러오기

  const fetchData = async () => {
    const result = await GetStats(postId);
    result.statistics.sort((a, b) => (a.index > b.index ? 1 : -1));
    setStatistics(result);

    console.log("stat: ", result);
  };

  useEffect(() => {
    if (postId !== "") fetchData();
  }, [postId]);

  const onAIAnalyse = async () => {
    setAiIsLoading(true);
    setShowAIRes(true);
    console.log(await GetAiAnalyse(JSON.stringify(surveyData), JSON.stringify(statistics)));
    setAIAnalyse(await GetAiAnalyse(JSON.stringify(surveyData), JSON.stringify(statistics)));
  };
  useEffect(() => {
    if (AIAnalyse !== null) {
      setAiIsLoading(false);
      Firework();
    }
  }, [AIAnalyse]);

  return (
    <FadeIn className="Statistics">
      <div className="statistics_center">
        <div className="statistics_wrapper">
          <div className="statistics_h1">{postTitle}</div>
          <div className="stat">통계</div>
          <div className="surveyListWrapper">
            <div className="AIAnalysisWrapper">
              <div className="buttonWrapper">
                <Button variant={aiIsLoading ? "primary" : "outline-primary"} disabled={aiIsLoading} onClick={aiIsLoading ? null : () => onAIAnalyse()}>
                  {aiIsLoading ? (
                    <Spinner className="icon" as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                  ) : (
                    <SiProbot className="icon-svg" />
                  )}
                  AI 결과분석
                </Button>
              </div>

              {showAIRes ? (
                <div className="AIResWrapper  animate__animated animate__fadeInUp">
                  <h1>AI 결과 분석</h1>
                  {aiIsLoading ? (
                    <Spinner className="icon spinner" variant="primary" as="span" animation="border" size="lg" role="status" aria-hidden="true" />
                  ) : (
                    <textarea className="AIRes animate__animated animate__fadeInUp" disabled>
                      {AIAnalyse}
                    </textarea>
                  )}
                </div>
              ) : null}
            </div>

            <StatList statistics={statistics} postId={postId} surveyData={surveyData} />
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default Statistics;
