import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mypage.css";
import profileimg from "../../assets/images/profile_sample1.png";
import edit_icon from "../../assets/images/edit_icon 1.png";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function Mypage() {
    const navigation = useNavigate();
    const handleSettingClick = () => {
        navigation("/mypage_setting");
    };
    const surveyList_written = [
        {
            title: "설문 제목 1",
            date: "2022-05-01",
            status: "진행중",
        },
        {
            title: "설문 제목 2",
            date: "2022-04-29",
            status: "마감",
        },
        {
            title: "설문 제목 3",
            date: "2022-04-27",
            status: "진행중",
        },
    ];

    const surveyList_writing = [
        {
            title: "설문 제목 4",
            date: "2022-05-01",
            status: "진행중",
        },
        {
            title: "설문 제목 5",
            date: "2022-04-29",
            status: "진행중",
        },
        {
            title: "설문 제목 6",
            date: "2022-04-27",
            status: "진행중",
        },
    ];

    return (
        <FadeIn className="Mypage">
            <div className="main">
                <div className="profile">
                    <div className="profile_box">
                        <div className="profile_img">
                            <img src={profileimg} alt="" />
                        </div>

                        <div className="nameline">
                            <div className="profile_name">Won Kim</div>
                            <div className="edit">
                                <button
                                    className="edit_button"
                                    onClick={handleSettingClick}
                                >
                                    <img src={edit_icon} alt="" />
                                </button>
                            </div>
                        </div>

                        <div className="line"></div>

                        <div className="profile_email">wonkim@gachon.ac.kr</div>

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

                <div className="Survey">
                    <div className="written_post">
                        <div className="I_write">내가 작성한 설문</div>
                        <div className="I_write_list">
                            {surveyList_written.map((survey, index) => (
                                <div className="survey_item" key={index}>
                                    <div className="survey_title">
                                        {survey.title}
                                    </div>
                                    <div className="survey_date">
                                        {survey.date}
                                    </div>
                                    <button
                                        className={`status_button ${
                                            survey.status === "진행중"
                                                ? "green"
                                                : "red"
                                        }`}
                                    >
                                        {survey.status}
                                    </button>
                                    <button className="statistics_button">
                                        통계보기
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="writing_post">
                        <div className="I_writing">내가 작성중인 설문</div>
                        <div className="I_writing_list">
                            {surveyList_writing.map((survey, index) => (
                                <div className="survey_item" key={index}>
                                    <div className="survey_title">
                                        {survey.title}
                                    </div>
                                    <div className="survey_date">
                                        {survey.date}
                                    </div>
                                    <button
                                        className={`status_button ${
                                            survey.status === "진행중"
                                                ? "green"
                                                : "red"
                                        }`}
                                    >
                                        {survey.status}
                                    </button>
                                    <button className="statistics_button">
                                        통계보기
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
