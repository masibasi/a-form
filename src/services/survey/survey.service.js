import axios from "axios";

const SURVEY_API_URL = process.env.REACT_APP_SURVEY_API_URL;
const AI_API_URL = process.env.REACT_APP_AI_API_URL;

export const CreateSurvey = (type, title, description, questions, userToken) => {
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
    questions: q,
  };
  console.log("newSurvey :asdfasdfsa ", newSurvey);
  console.log("token : ", userToken);
  const formId = axios
    .post(`${SURVEY_API_URL}/api/surveys`, newSurvey, options)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(formId);
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
  console.log(result.data);
  return result;
};

export const GetSurveyById = async (id) => {
  const result = await axios.get(`${SURVEY_API_URL}/api/surveys/${id}`);
  console.log(result.data);
  return result;
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
