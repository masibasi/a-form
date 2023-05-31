import React, { useContext, useEffect, useState } from "react";

import "./SurveyList.css";
import { SurveyListItem } from "./SurveyListItem";
import { SurveyContext } from "../../services/survey/survey.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { PostContext } from "../../services/post/post.context";
import { GetSurveyData } from "../../services/survey/survey.service";

export const SurveyList = ({ type, page, offset, status, sort }) => {
  const [formData, setFormData] = useState();
  const [showList, setShowList] = useState(false);
  const { GetAnsweredSurveys } = useContext(SurveyContext);
  const { GetPostSurveys } = useContext(PostContext);
  const { userData, userToken } = useContext(AuthenticationContext);
  const { GetAllPostSurveys } = useContext(PostContext);
  const { GetPostedSurveys } = useContext(SurveyContext);

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
                author={it.postAuthor}
                type={type}
                postStartDate={it.postStartDate}
                postDueDate={it.postDueDate}
              />
            ) : type === "answered" ? (
              <SurveyListItem key={it._id} title={it.title} id={it._id} author={it.author} type={type} />
            ) : (
              <SurveyListItem key={it._id} title={it.title} id={it._id} author={it.author} type={type} />
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
