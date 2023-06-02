import React, { useEffect, useState } from "react";
import StatListItem from "./StatListItem";

const StatList = ({ statistics }) => {
  useEffect(() => {
    console.log("statstat : ", statistics);
  }, [statistics]);
  return <div className="StatList">{statistics === null ? null : statistics.statistics.map((item) => <StatListItem key={item.index} item={item} />)}</div>;
};

export default StatList;
