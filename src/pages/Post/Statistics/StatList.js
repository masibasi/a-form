import React, { useEffect, useState } from "react";
import StatListItem from "./StatListItem";

const StatList = ({ statistics, postId, surveyData }) => {
  useEffect(() => {
    console.log("statstat : ", statistics);
  }, [statistics]);
  return (
    <div className="StatList">
      {statistics === null || surveyData === null || !surveyData.questions || surveyData.questions.length !== statistics.statistics.length
        ? null
        : statistics.statistics.map((item, index) => (
            <StatListItem
              key={item.index}
              item={item}
              questionNumber={index + 1}
              postId={postId}
              questionTitle={surveyData.questions[index].title}
              selections={surveyData.questions[index].selections}
            />
          ))}
    </div>
  );
};

export default StatList;
