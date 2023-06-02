import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import FadeIn from "../../animation/FadeIn";
import { SurveyList } from "../../components/SurveyList/SurveyList";
import { GetUserData } from "../../services/authentication/authentication.service";

export default function MyTemplatePage() {
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
  const [currentPage, setCurrentPage] = useState(1); //1페이지부터 시작

  return (
    <FadeIn className="Mypage">
      <div className="main">
        <div className="my_template">
          <div className="I_write">나의 설문 템플릿</div>
          <div className="surveyListWrapper">
            <div className="I_write_list">
              <SurveyList type="template" page={currentPage} offset={5} progressStatus="all" content="" sort="desc" />
            </div>
            <div className="page-button-container">
              {currentPage > 1 ? (
                <button className="page-button" onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}>
                  Previous Page
                </button>
              ) : (
                <button className="page-button invisible">Previous Page</button> /* 페이지가 1일 때는 버튼을 숨김 */
              )}
              <span className="page-number">{currentPage}</span>
              <button className="page-button" onClick={() => setCurrentPage((old) => old + 1)}>
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
