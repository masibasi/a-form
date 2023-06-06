import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AvsBSurveyListItem } from "./AvsBSurveyListItem";
import "./AvsBSurveyList.css";
import { PostContext } from "../../services/post/post.context";

export const AvsBSurveyList = ({ page, offset, status, sort }) => {
    const [formData, setFormData] = useState(null);
    const [showList, setShowList] = useState(false);
    const { GetABPosts, GetNORMALPosts } = useContext(PostContext);

    const getFormData = async () => {
        setFormData(await GetABPosts());
    };

    useEffect(() => {
        getFormData();
    }, []);

    return (
        <div className="AvsBSurveyList">
            {formData === null ? null : (
                <>
                    {formData
                        .reverse()
                        .slice(0, 3)
                        .map((it) => (
                            <AvsBSurveyListItem key={it.postPk} title={it.postTitle} id={it.postPk} author={it.postAuthorId} />
                        ))}
                </>
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
