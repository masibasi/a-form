import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AvsBSurveyListItem.css";
import { PostContext } from "../../services/post/post.context";
import { SurveyContext } from "../../services/survey/survey.context";

export const AvsBSurveyListItem = ({ title, id }) => {
    const navigate = useNavigate();
    const { GetPost } = useContext(PostContext);
    const { GetSurveyById } = useContext(SurveyContext);
    const [surveyData, setSurveyData] = useState(null);

    const onLoad = async () => {
        const postData = await GetPost(id);
        setSurveyData(await GetSurveyById(postData.postSurvey));
    };
    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() => {
        console.log("asdfasfdsadfasdf : ", surveyData);
    }, [surveyData]);
    return (
        <>
            {surveyData === null ? null : (
                <div className="AvsBSurveyListItem hvr-glow" onClick={() => navigate(`/details/${id}`)}>
                    <div className="ImgWrapper">
                        <img className="surveyImgA" src={surveyData.data.questions[0].imageUrl} alt="" />
                        <img className="surveyImgB" src={surveyData.data.questions[1].imageUrl} alt="" />
                    </div>
                    <div className="surveyTitle">{title}</div>
                </div>
            )}
        </>
    );
};
