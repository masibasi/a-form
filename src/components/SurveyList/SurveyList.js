import React, { useContext, useEffect, useState } from "react";

import "./SurveyList.css";
import { SurveyListItem } from "./SurveyListItem";
import { SurveyContext } from "../../services/survey/survey.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { PostContext } from "../../services/post/post.context";

export const SurveyList = ({ type, page, offset, status, sort }) => {
  const [formData, setFormData] = useState();
  const [showList, setShowList] = useState(false);
  const { GetSurveyData } = useContext(SurveyContext);
  const { GetAnsweredSurveys } = useContext(SurveyContext);
  const { GetPostSurveys } = useContext(PostContext);
  const { userData, userToken } = useContext(AuthenticationContext);

  const getFormData = async () => {
    // console.log(page, offset, status, sort);
    let result;
    if (type === "post") {
      console.log(userData);
      result = await GetPostSurveys(userData.userPk, offset, page);
      console.log(result);
      console.log("post");
      setFormData(result);
    } else if (type === "answered") {
      result = await GetAnsweredSurveys(offset, page, userToken);
      console.log(result);
      console.log("answered");
      setFormData(result);
    } else {
      result = await GetSurveyData(page, offset, status, sort);
      console.log(result);
      console.log("other");
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
  }, [userData]);

  return (
    <div className="SurveyList">
      {showList ? (
        <>
          {formData.map((it) =>
            type === "post" ? (
              <SurveyListItem key={it.postPk} title={it.postTitle} id={it.postPk} author={it.postAuthor} />
            ) : type === "answered" ? (
              <SurveyListItem key={it._id} title={it.title} id={it._id} author={it.author} />
            ) : (
              <SurveyListItem key={it._id} title={it.title} id={it._id} author={it.author} />
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
