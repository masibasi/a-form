import "./Community.css";

import { SurveyList } from "../../components/SurveyList/SurveyList";
import { HotAvsBSurvey, HotCategory } from "../../components/SurveyList/SurveyListItem";
import FadeIn from "../../animation/FadeIn";
import { CategoryList } from "../../components/CategoryList";
import { useNavigate } from "react-router-dom";
import { AvsBSurveyList } from "../../components/SurveyList/AvsBSurveyList";
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";

const SeachBar = React.memo(({ searchKeyword, setSearchKeyword }) => {
  return (
    <div className="d-flex searchWrapper ">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2 searchBar"
        aria-label="Search"
        value={searchKeyword.current}
        onChange={(e) => setSearchKeyword(e)}
      />
      <Button variant="outline-success">Search</Button>
    </div>
  );
});
export const Community = () => {
  const navigate = useNavigate();
  const searchKeyword = useRef(null);

  const setSearchKeyword = (e) => {
    console.log(JSON.stringify(e.target.value));
    const value = e.target.value;
    searchKeyword.current = value;
  };
  const handleAllMoreClick = () => {
    navigate("/community/allpostlist");
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let timeOfDay;
  let displayHour;
  if (currentHour < 12) {
    timeOfDay = "오전";
    displayHour = currentHour;
  } else {
    timeOfDay = "오후";
    displayHour = currentHour % 12;
  }

  return (
    <FadeIn className="Community" childClassName="childClassName">
      {/* <SeachBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} /> */}
      <div className="titleWrapper">
        <h2 className="pageTitle">Community</h2>
      </div>

      <div className="titleWrapper">
        <h4 className="title">많이 본 설문</h4>
      </div>
      <div className="bottomWrapper">
        <div className="hotSurveyWrapper hvr-float">
          <div className="title2Wrapper">
            <h5 className="title_hot">{`${timeOfDay} ${displayHour}시의 Hot 설문`}</h5>
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
        <AvsBSurveyList />
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
