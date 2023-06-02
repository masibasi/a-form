import "./Community.css";

import { SurveyList } from "../../components/SurveyList/SurveyList";
import { HotAvsBSurvey, HotCategory } from "../../components/SurveyList/SurveyListItem";
import FadeIn from "../../animation/FadeIn";
import { CategoryList } from "../../components/CategoryList";
import { useNavigate } from "react-router-dom";

export const Community = () => {
  const navigate = useNavigate();

  const handleAllMoreClick = () => {
    navigate("/community/allpostlist");
  };

  const handleHotMoreClick = () => {
    navigate("/allhotlist");
  };

  return (
    <FadeIn className="Community" childClassName="childClassName">
      <div className="titleWrapper">
        <h2 className="pageTitle">Community</h2>
      </div>

      <div className="titleWrapper">
        <h4 className="title">많이 본 설문</h4>
      </div>
      <div className="bottomWrapper">
        <div className="hotSurveyWrapper hvr-float">
          <div className="title2Wrapper">
            <h5>Hot 설문</h5>
            <p onClick={handleHotMoreClick} style={{ cursor: "pointer" }}>
              더보기
            </p>
          </div>
          <SurveyList type="popular" progressStatus="all" content="" sort="desc" />
        </div>
        <div className="hotCategoryWrapper hvr-float">
          <div className="title2Wrapper">
            <h5>Hot 분야</h5>
            <p>더보기</p>
          </div>
          <CategoryList />
        </div>
      </div>
      <div className="titleWrapper">
        <h4 className="title">박빙설문 A vs B</h4>
        <p>더보기</p>
      </div>
      <div className="AvsBWrapper hvr-float">
        <HotAvsBSurvey />
        <HotAvsBSurvey />
        <HotAvsBSurvey />
      </div>
      <div className="titleWrapper all ">
        <h4 className="title">전체 설문</h4>
        <p onClick={handleAllMoreClick} style={{ cursor: "pointer" }}>
          더보기
        </p>
      </div>
      <div className="surveyListWrapper hvr-float">
        <SurveyList type="allpost" offset={5} page={0} progressStatus="all" content="" sort="desc" />
      </div>
    </FadeIn>
  );
};
