import React, { useEffect, useState } from "react";
import StatListItem from "./StatListItem";

const StatList = ({ statistics, postId, surveyData }) => {
  useEffect(() => {
    console.log("statlist : ", statistics);
  }, [statistics]);
  return (
    <div className="StatList">
      {statistics === null || surveyData === null || !surveyData.questions || surveyData.questions.length !== statistics.statistics.length
        ? null
        : statistics.statistics.map((item, index) => {
            const question = surveyData.questions[index];
            return (
              <StatListItem
                key={item.index}
                index={item.index}
                stats={item}
                questionNumber={index + 1}
                postId={postId}
                questionTitle={question.title}
                selections={question.selections}
                surveyData={surveyData}
              />
            );
          })}
    </div>
  );
};

export default StatList;
