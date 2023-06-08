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
    const { userData, userToken, initilaizeUserData } = useContext(AuthenticationContext);
    const { GetAllPostSurveys, GetPost } = useContext(PostContext);
    const { GetPostedSurveys, GetSurveyById } = useContext(SurveyContext);
    const { GetPopularPost } = useContext(PostContext);

    const getFormData = async () => {
        // console.log(page, offset, status, sort);
        let result;
        if (type === "post") {
            //내가 올린 설문
            if (userData === undefined) await initilaizeUserData();
            result = await GetPostSurveys(userData.userPk, offset, page);
            setFormData(result);
        } else if (type === "answered") {
            // 내가 응답한 설문
            result = await GetAnsweredSurveys(offset, page, userToken);
            setFormData(result);
        } else if (type === "template") {
            // 내가 만든 템플릿
            result = await GetPostedSurveys(page, offset, userToken);
            setFormData(result.data);
        } else if (type === "allpost" || type === "popular") {
            // 모든 포스트 또는 인기설문
            let result;
            if (type === "allpost") {
                result = await GetAllPostSurveys(offset, page);
            } else if (type === "popular") {
                result = await GetPopularPost();
            }

            console.log("result: ", result);
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
        getFormData();
    }, [userData, page]);

    return (
        <div className="SurveyList">
            {showList ? (
                <>
                    {formData.map((it) =>
                        type === "post" || type === "allpost" || type === "popular" ? (
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
                        ) : type === "answered" ? (
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
