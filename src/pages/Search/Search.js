import { useParams } from "react-router-dom";
import FadeIn from "../../animation/FadeIn";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../services/post/post.context";
import { SurveyContext } from "../../services/survey/survey.context";

import "./Search.css";
import { SurveyListItem } from "../../components/SurveyList/SurveyListItem";
export const Search = () => {
    const { keyword } = useParams();

    const { GetAllPostSurveys } = useContext(PostContext);
    const { GetSurveyData } = useContext(SurveyContext);

    const [postData, setPostData] = useState(null);
    const [surveyData, setSurveyData] = useState(null);

    const loadList = async () => {
        setPostData(await GetAllPostSurveys(999, 0));
        setSurveyData(await GetSurveyData(1, 99999, "", "desc"));
    };
    useEffect(() => {
        loadList();
    }, []);
    return (
        <FadeIn className="Search" childClassName="childClassName">
            <div className="titleWrapper">
                <h2 className="pageTitle">검색 결과</h2>
            </div>
            <div className="titleWrapper">
                <h4 className="title">설문</h4>
            </div>
            <div className="surveyListWrapper">
                {postData === null
                    ? null
                    : postData
                          .filter((it) => it.postTitle.indexOf(keyword) !== -1)
                          .map((it) => (
                              <SurveyListItem
                                  key={it.postPk}
                                  title={it.postTitle}
                                  id={it.postPk}
                                  author={it.postAuthor}
                                  surveyType={it.type}
                                  postStartDate={it.postStartDate}
                                  postDueDate={it.postDueDate}
                              />
                          ))}
            </div>
        </FadeIn>
    );
};
