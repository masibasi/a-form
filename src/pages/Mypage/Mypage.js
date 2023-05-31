import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mypage.css";
import profileimg from "../../assets/images/profile_sample1.png";
import edit_icon from "../../assets/images/edit_icon 1.png";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import FadeIn from "../../animation/FadeIn";
import { SurveyList } from "../../components/SurveyList/SurveyList";
import { SurveyContext } from "../../services/survey/survey.context";

export default function Mypage() {
  const navigate = useNavigate();
  const handleSettingClick = () => {
    navigate("/mypage_setting");
  };
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

  return (
    <FadeIn className="Mypage">
      <div className="main">
        <div className="profile">
          <div className="profile_box">
            <div className="profile_img">
              <img src={profileimg} alt="" />
            </div>

            <div className="nameline">
              <div className="profile_name">Minsik Choi</div>
              <div className="edit">
                <button className="edit_button" onClick={handleSettingClick}>
                  <img src={edit_icon} alt="" />
                </button>
              </div>
            </div>

            <div className="line"></div>

            <div className="profile_email">minsikchoi@gachon.ac.kr</div>

            <div className="profile_post">
              <div className="post">작성 설문수</div>
              <div className="post_num">21</div>
            </div>

            <div className="profile_response">
              <div className="response">답변 설문수</div>
              <div className="response_num">45</div>
            </div>
          </div>
        </div>

        <div className="Mypage_survey">
          <div className="my_template">
            <div className="I_write">나의 설문 템플릿</div>
            <div className="I_write_list">
              <SurveyList page={1} offset={10} progressStatus="all" content="" sort="desc" />
            </div>
          </div>

          <div className="I_post">
            <div className="I_writing">내가 올린 설문</div>
            <div className="I_writing_list">
              <SurveyList type="post" page={0} offset={10} progressStatus="all" content="" sort="desc" />
            </div>
          </div>

          <div className="I_answer">
            <div className="I_writing">내가 응답한 설문</div>
            <div className="I_writing_list">
              <SurveyList type="answered" page={0} offset={10} progressStatus="all" content="" sort="desc" />
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
