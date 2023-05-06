import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyList.css";
import { SurveyListItem } from "../../components/SurveyListItem";
export const SurveyList = ({ page, offset, status, sort }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [showList, setShowList] = useState(false);
    const getFormData = async () => {
        const result = await axios.get(`http://localhost:3010/surveys?page=${page}&offset=${offset}&progressStatus=${status}&sort=${sort}`);
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
