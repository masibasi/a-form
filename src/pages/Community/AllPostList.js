import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyList } from "../../components/SurveyList/SurveyList";
import FadeIn from "../../animation/FadeIn";
import "./Community.css";

export default function AllPostList() {
  const navigate = useNavigate();

  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(0); //0페이지부터 시작

  // 이전 페이지
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((old) => old - 0);
    }
  };

  // 다음 페이지
  const handleNextPage = () => {
    setCurrentPage((old) => old + 1);
  };

  return (
    <div className="AllPostList">
      <FadeIn>
        <h1>전체 설문</h1>
      </FadeIn>

      <div className="surveyListWrapper">
        <FadeIn>
          <SurveyList type="allpost" offset={10} page={currentPage} progressStatus="all" content="" sort="desc" />

          <div className="page-button-container">
            {currentPage > 0 ? (
              <button className="page-button" onClick={() => setCurrentPage((old) => Math.max(old - 1, 0))}>
                Previous Page
              </button>
            ) : (
              <button className="page-button invisible">Previous Page</button> /* 페이지가 0일 때는 버튼을 숨김 */
            )}
            <span className="page-number">{currentPage + 1}</span>
            <button className="page-button" onClick={() => setCurrentPage((old) => old + 1)}>
              Next Page
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
