import axios from "axios";
import React, { useEffect, useState } from "react";
import { AvsBSurveyListItem } from "./AvsBSurveyListItem";
import "./AvsBSurveyList.css";

export const AvsBSurveyList = ({ page, offset, status, sort }) => {
  const [formData, setFormData] = useState([]);
  const [showList, setShowList] = useState(false);
  const { GetSurveyData } = useContext(SurveyContext);

  const getFormData = async () => {
    console.log(page, offset, status, sort);

    const result = await GetSurveyData(page, offset, status, sort);
    console.log(result);
    setFormData(result.data.data);
    setShowList(true);
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <div className="AvsBSurveyList">
      {showList ? (
        <>
          {formData.map((it) => (
            <AvsBSurveyListItem key={it._id} title={it.title} id={it._id} author={it.author} />
          ))}
        </>
      ) : (
        <div>{String(typeof formData)}</div>
      )}
    </div>
  );
};

AvsBSurveyList.defaultProps = {
  page: 1,
  offset: 10,
  progressStatus: "all",
  content: "",
  sort: "desc",
};
