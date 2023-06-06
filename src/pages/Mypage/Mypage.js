import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import "./Mypage.css";
import profileimg from "../../assets/images/profile_sample1.png";
import edit_icon from "../../assets/images/edit_icon 1.png";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import FadeIn from "../../animation/FadeIn";
import { SurveyList } from "../../components/SurveyList/SurveyList";
import { SurveyContext } from "../../services/survey/survey.context";
import { GetPostedSurveys, GetAnsweredSurveysTotal } from "../../services/survey/survey.service";
import { GetUserData } from "../../services/authentication/authentication.service";
import MyTemplatePage from "./MyTemplatePage";
import MyPostedSurveysPage from "./MyPostedSurveysPage";
import MyAnsweredSurveysPage from "./MyAnsweredSurveysPage";
import { GetUserPostsCnt } from "../../services/post/post.service";
import { ButtonGroup, Button } from "react-bootstrap";

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

    // 유저 데이터 가져오기
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await GetUserData(userToken);
            setUserData(result);
        };
        fetchData();
    }, []);

    //작성 설문수 가져오기
    const [userPostsCount, setUserPostsCount] = useState(0);

    useEffect(() => {
        const fetchUserPostsCount = async () => {
            if (userData) {
                const result = await GetUserPostsCnt(userData.userPk);
                setUserPostsCount(result);
            }
        };

        fetchUserPostsCount();
    }, [userData]);

    //답변 설문수 받아오기
    const [answeredSurveys, setAnsweredSurveys] = useState([]);
    useEffect(() => {
        const fetchAnsweredSurveys = async () => {
            const result = await GetAnsweredSurveysTotal(1, 10, userToken); // 여기에서 page와 offset 값을 제공
            setAnsweredSurveys(result);
        };

        fetchAnsweredSurveys();
    }, [userToken]);

    return (
        <FadeIn className="Mypage">
            <div className="main">
                <div className="profile">
                    <div className="profile_box">
                        <div className="profile_img">
                            <img src={profileimg} alt="" />
                        </div>

                        <div className="nameline">
                            <div className="profile_name">{userData?.name}</div>
                            <div className="edit">
                                <button className="edit_button" onClick={handleSettingClick}>
                                    <img src={edit_icon} alt="" />
                                </button>
                            </div>
                        </div>

                        <div className="line"></div>

                        <div className="profile_email">{userData?.email}</div>

                        <div className="profile_post">
                            <div className="post">작성 설문수</div>
                            <div className="post_num" onClick={() => navigate("posted")} style={{ cursor: "pointer" }}>
                                {userPostsCount}
                            </div>
                        </div>

                        <div className="profile_response">
                            <div className="response">답변 설문수</div>
                            <div className="response_num" onClick={() => navigate("answered")} style={{ cursor: "pointer" }}>
                                {answeredSurveys ? answeredSurveys.total : 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Mypage_survey">
                    <div className="btnGroupWrapper">
                        <ButtonGroup>
                            <Button variant="outline-primary" className="" onClick={() => navigate("template")}>
                                나의 설문 템플릿
                            </Button>
                            <Button variant="outline-primary" className="" onClick={() => navigate("posted")}>
                                내가 올린 설문
                            </Button>
                            <Button variant="outline-primary" className="" onClick={() => navigate("answered")}>
                                내가 응답한 설문
                            </Button>
                        </ButtonGroup>
                    </div>

                    <Routes>
                        <Route path="template" element={<MyTemplatePage />} />
                        <Route path="posted" element={<MyPostedSurveysPage />} />
                        <Route path="answered" element={<MyAnsweredSurveysPage />} />
                    </Routes>
                </div>
            </div>
        </FadeIn>
    );
}
