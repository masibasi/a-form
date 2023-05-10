import axios from "axios";

export const CreateSurvey = (type, deadline, title, description, questions, userToken) => {
    // send newSurvey to database
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };
    const q = questions;
    q.map((it) => {
        delete it["id"];
    });
    const newSurvey = {
        type: type,
        title: title,
        description: description,
        deadline: "2023-05-04T12:50:18.171Z",
        questions: q,
    };
    console.log("newSurvey :asdfasdfsa ", newSurvey);
    console.log("token : ", userToken);
    const formId = axios
        .post("http://localhost:3010/surveys", newSurvey, options)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return formId;
};

export const GetSurveyData = async (page, offset, status, sort) => {
    const result = await axios.get(`http://localhost:3010/surveys?page=${page}&offset=${offset}&progressStatus=${status}&sort=${sort}`);
    console.log(result.data);
    return result;
};

export const GetSurveyById = async (id) => {
    const result = await axios.get(`http://localhost:3010/surveys/${id}`);
    console.log(result.data);
    return result;
};

export const PostSurveyAnswer = async (surveyAnswer, userToken) => {
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };
    const result = await axios
        .post("http://localhost:3010/answers", surveyAnswer, options)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
};

export const AIGenerateSurvey = async (msg, userToken) => {
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };
    const body = {
        msg: msg,
    };
    const result = await axios
        .post("http://localhost:5001/chatbot", body, options)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
};
