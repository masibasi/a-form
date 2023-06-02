import React from "react";

export const StatListItem = ({ item }) => {
  return (
    <div className="StatListItem">
      <h3>{`Question ${parseInt(item.index) + 1}`}</h3>
      <ul>
        {item.values.map((value) => (
          <li key={value.answer}>
            Answer: {value.answer}, Count: {value.count}, Percent: {value.percent}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatListItem;
