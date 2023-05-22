import React, { useContext, useEffect, useState } from "react";

import "./SurveyList.css";
import { SurveyListItem } from "./SurveyListItem";
import { SurveyContext } from "../../services/survey/survey.context";

export const SurveyList = ({ type, page, offset, status, sort }) => {
  const [formData, setFormData] = useState();
  const [showList, setShowList] = useState(false);
  const { GetSurveyData, getAnsweredSurveys } = useContext(SurveyContext);
  const getFormData = async () => {
    console.log(page, offset, status, sort);
    let result;
    if (type === "answered") {
      result = await getAnsweredSurveys(page, offset, status, sort);
    } else {
      result = await GetSurveyData(page, offset, status, sort);
    }
    console.log(result);
    setFormData(result.data.data);
    setShowList(true);
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <div className="SurveyList">
      {showList ? (
        <>
          {formData.map((it) => (
            <SurveyListItem key={it._id} title={it.title} id={it._id} author={it.author} />
          ))}
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
