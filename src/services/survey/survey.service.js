import axios from "axios";

const SURVEY_API_URL = process.env.REACT_APP_SURVEY_API_URL;

export const CreateSurvey = (type, title, description, questions, userToken) => {
    // send newSurvey to database
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };
    const q = questions;
    q.map((it) => {
        delete it["id"];
        return it;
    });
    const newSurvey = {
        type: type,
        title: title,
        description: description,
        questions: q,
    };
    console.log("newSurvey :asdfasdfsa ", newSurvey);
    console.log("token : ", userToken);
    const formId = axios
        .post(`${SURVEY_API_URL}/api/surveys`, newSurvey, options)
        .then((response) => {
            console.log("create survey res", response);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
    console.log("survey id : ", formId);
    return formId;
};

export const DeleteSurvey = async (surveyid, userToken) => {
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };

    const result = await axios
        .delete(`${SURVEY_API_URL}/api/surveys/${surveyid}`, options)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
};
export const GetSurveyData = async (page, offset, status, sort) => {
    const result = await axios.get(`${SURVEY_API_URL}/api/surveys?page=${page}&offset=${offset}&progressStatus=${status}&sort=${sort}`);
    console.log("result: ", result.data);
    return result;
};

export const GetSurveyById = async (id) => {
    const result = await axios.get(`${SURVEY_API_URL}/api/surveys/${id}`);
    console.log("get survey by id:", result.data);
    return result;
};

export const GetSurveyById2 = async (id) => {
    const result = await axios.get(`${SURVEY_API_URL}/api/surveys/${id}`);
    console.log("get survey by id:", result.data);
    return result.data;
};

export const PostSurveyAnswer = async (surveyAnswer, surveyId, userToken) => {
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };
    console.log("answer: ", surveyAnswer);

    const result = await axios
        .post(`${SURVEY_API_URL}/api/surveys/${surveyId}/answers`, surveyAnswer, options)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 400) {
                alert("투표는 한번만 가능합니다!");
            }
        });
    return result;
};

export const GetAnsweredSurveys = async (page, offset, userToken) => {
    console.log(page, offset, userToken);
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };

    const result = await axios
        .get(`${SURVEY_API_URL}/api/surveys/my-page/surveys/answers?page=${page}&offset=${offset}`, options)
        .then((res) => {
            console.log("getanswer", res);
            return res.data.data;
        })
        .catch((err) => console.log(err));
    return result;
};

// 위에와 리턴하는 데이터 구조가 달라서 따로 만듬
export const GetAnsweredSurveysTotal = async (page, offset, userToken) => {
    console.log(page, offset, userToken);
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };

    const result = await axios
        .get(`${SURVEY_API_URL}/api/surveys/my-page/surveys/answers?page=${page}&offset=${offset}`, options)
        .then((res) => {
            console.log("getanswerTotal", res);
            return res.data;
        })
        .catch((err) => console.log(err));
    return result;
};

export const GetPostedSurveys = async (page, offset, userToken) => {
    //작성 설문수와 나의 설문 템플릿을 받아온다
    //   console.log(page, offset, userToken);
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${userToken}` } };

    const result = await axios
        .get(`${SURVEY_API_URL}/api/surveys/my-page/surveys?page=${page}&offset=${offset}`, options)
        .then((res) => {
            console.log("getPost", res);
            return res.data;
        })
        .catch((err) => console.log(err));
    return result;
};

/* AvsB */

export const CreateAvsBSurvey = async (formData) => {
    const res = await axios({
        method: "post",
        url: `${SURVEY_API_URL}/api/surveys`,
        data: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    })
        .then((res) => {
            console.log("create avsb survey res : ", res);
            return res.data;
        })
        .catch((err) => console.log(err));
    return res;
};

/* Files */

export const PostFiles = async (formData) => {
    console.log("formdata : ", formData);
    const res = await axios
        .post(`${SURVEY_API_URL}/api/surveys/files`, formData)
        .then((res) => {
            console.log("fileUpload : ", res);
            return res.data;
        })
        .catch((err) => console.log("fileUpload err : ", err));

    return res;
};

export const GetStats = async (id) => {
    // 통계 받아오기
    const options = {
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    const result = await axios
        .get(`${SURVEY_API_URL}/api/surveys/${id}/statistics`, options)
        .then((res) => {
            console.log("getStats in service", res);
            return res.data;
        })
        .catch((err) => console.log(err));

    return result;
};
