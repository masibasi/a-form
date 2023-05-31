import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import FadeIn from "../../animation/FadeIn";
import { SurveyList } from "../../components/SurveyList/SurveyList";
import { GetUserData } from "../../services/authentication/authentication.service";

export default function MyPostedSurveysPage() {
  const navigate = useNavigate();
  const { userToken, isLogin } = useContext(AuthenticationContext);

  const CheckLogin = () => {
    if (isLogin == false) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate(-1);
    }
  };

  useEffect(() => {
    CheckLogin();
  }, []);

  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(0); // 0페이지부터 시작

  return (
    <FadeIn className="Mypage">
      <div className="main">
        <div className="I_post">
          <div className="I_writing">내가 올린 설문</div>
          <div className="I_writing_list">
            <SurveyList type="post" page={currentPage} offset={5} progressStatus="all" content="" sort="desc" />
          </div>
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
        </div>
      </div>
    </FadeIn>
  );
}
