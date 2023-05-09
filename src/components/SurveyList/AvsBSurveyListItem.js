import React from "react";
import { useNavigate } from "react-router-dom";
import "./AvsBSurveyListItem.css";

export const AvsBSurveyListItem = ({ title, desc, id, imgFileA, imgFileB, A, B }) => {
  const navigate = useNavigate();
  return (
    <div className="AvsBSurveyListItem" onClick={() => navigate(`/details/${id}`)}>
      <div className="surveyTitle">{title}</div>
      {/* <p className="fromdesc">{desc}</p> */}

      <div className="A">
        <img className="surveyImgA" src={imgFileA} alt="" />
        <p className="ATitle">{A}</p>
        {/* <p className="ADesc">{A}</p> */}
      </div>

      <div className="B">
        <img className="surveyImgB" src={imgFileB} alt="" />
        <p className="BTitle">{A}</p>
        {/* <div className="BDesc"></div> */}
      </div>
    </div>
  );
};
