import React, { useContext, useEffect, useState } from "react";

import "./SurveyList.css";
import { SurveyListItem } from "./SurveyListItem";
import { SurveyContext } from "../../services/survey/survey.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { PostContext } from "../../services/post/post.context";
import { GetSurveyData } from "../../services/survey/survey.service";

export const SurveyList = ({ type, page, offset, status, sort, date }) => {
    const [formData, setFormData] = useState();
    const [showList, setShowList] = useState(false);
    const { GetAnsweredSurveys } = useContext(SurveyContext);
    const { GetPostSurveys } = useContext(PostContext);
    const { userData, userToken } = useContext(AuthenticationContext);
    const { GetAllPostSurveys, GetPost } = useContext(PostContext);
    const { GetPostedSurveys, GetSurveyById } = useContext(SurveyContext);
    const { GetPopularPost } = useContext(PostContext);

    const getFormData = async () => {
        // console.log(page, offset, status, sort);
        let result;
        if (type === "post") {
            //내가 올린 설문
            console.log(userData);
            result = await GetPostSurveys(userData.userPk, offset, page);
            console.log(result);
            console.log("post");
            setFormData(result);
        } else if (type === "answered") {
            // 내가 응답한 설문
            result = await GetAnsweredSurveys(offset, page, userToken);
            console.log(result);
            console.log("answered");
            setFormData(result);
        } else if (type === "template") {
            // 내가 만든 템플릿
            result = await GetPostedSurveys(page, offset, userToken);
            console.log(result);
            console.log("template");
            setFormData(result.data);
        } else if (type === "allpost") {
            // 모든 포스트
            result = await GetAllPostSurveys(offset, page);
            console.log(result);
            console.log("allpost");
            const modifiedData = await Promise.all(
                result.map(async (post) => {
                    const postData = await GetPost(post.postPk);
                    const surveyId = postData.postSurvey;
                    console.log("surveyId: ", surveyId);
                    const surveyData = await GetSurveyById(surveyId);
                    // console.log("surveyData: ", surveyData);
                    const surveyAuthor = surveyData.data.author;
                    // console.log("surveyAuthor: ", surveyAuthor);

                    return {
                        ...post,
                        postAuthor: surveyAuthor, // postAuthor 값을 실제 Author의 이름으로 변경
                    };
                })
            ).catch((err) => console.log(err));

            setFormData(modifiedData);
            // setFormData(result);
        } else if (type === "popular") {
            // 인기 설문
            // const now = new Date(); // 현재 시간 받기
            // console.log("now: ", now);

            // const year = now.getFullYear();
            // const month = String(now.getMonth() + 1).padStart(2, "0");
            // const date = String(now.getDate()).padStart(2, "0");
            // const hours = String(now.getHours()).padStart(2, "0");
            // const minutes = String(now.getMinutes()).padStart(2, "0");
            // const seconds = String(now.getSeconds()).padStart(2, "0");
            // const offsetMinutes = now.getTimezoneOffset(); // 현재 시간의 UTC와 지역 시간 간격 (분 단위)
            // const offsetHours = -Math.floor(offsetMinutes / 60); // UTC와 지역 시간 간격 (시간 단위)
            // const offsetSign = offsetHours >= 0 ? "+" : "-";
            // const offsetFormatted = `${offsetSign}${Math.abs(offsetHours).toString().padStart(2, "0")}:00`; // 시간 형식 맞추기 ("+09:00")
            // const formattedDateTime = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}${offsetFormatted}`;
            // console.log("date: ", formattedDateTime);

            const now = new Date(); // 현재 로컬 시간 받기

            const utcNow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));

            const year = utcNow.getUTCFullYear();
            const month = String(utcNow.getUTCMonth() + 1).padStart(2, "0");
            const date = String(utcNow.getUTCDate()).padStart(2, "0");
            const hours = String(utcNow.getUTCHours()).padStart(2, "0");
            const minutes = String(utcNow.getUTCMinutes()).padStart(2, "0");
            const seconds = String(utcNow.getUTCSeconds()).padStart(2, "0");
            const offsetFormatted = "+09:00"; // UTC 시간이므로 오프셋은 +00:00
            const formattedDateTime = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}${offsetFormatted}`;
            console.log("formattedDateTime: ", formattedDateTime);
            result = await GetPopularPost(formattedDateTime);
            console.log("result: ", result);
            console.log("popular");
            setFormData(result);
        } else {
            result = await GetSurveyData(page, offset, userToken);
            console.log(result);
            console.log("template");
            setFormData(result.data.data);
        }
    };

    useEffect(() => {
        if (formData != undefined) {
            setShowList(true);
        }
    }, [formData]);

    useEffect(() => {
        if (userData != undefined) getFormData();
    }, [userData, page]);

    return (
        <div className="SurveyList">
            {showList ? (
                <>
                    {formData.map((it) =>
                        type === "post" || type === "allpost" ? (
                            <SurveyListItem
                                key={it.postPk}
                                title={it.postTitle}
                                id={it.postPk}
                                author={it.postAuthorId}
                                type={type}
                                surveyType={it.postSurveyType}
                                postStartDate={it.postStartDate}
                                postDueDate={it.postDueDate}
                            />
                        ) : type === "answered" || type === "popular" ? (
                            <SurveyListItem key={it._id} title={it.title} id={it._id} surveyType={it.type} author={it.author} type={type} />
                        ) : (
                            <SurveyListItem key={it._id} title={it.title} id={it._id} surveyType={it.type} author={it.author} type={type} />
                        )
                    )}
                </>
            ) : (
                <div>{String(typeof formData)}</div>
            )}
        </div>
    );
};

SurveyList.defaultProps = {
    page: 1,
    offset: 10,
    progressStatus: "all",
    content: "",
    sort: "desc",
};
