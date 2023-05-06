import axios from "axios";

export const createSurvey = (type, deadline, title, description, questions) => {
    //token은 나중에 authentication context에서 로그인 후 받아올 것 임
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InRlc3Q0IiwiaWF0IjoxNjgzMzE1NDQ3LCJleHAiOjE2ODM5MjAyNDd9.vnCH2qF4GHIcxKzaVEGTyarViGWbyT10kUg5KHPVldQ";
    // send newSurvey to database
    const options = { headers: { accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
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
    console.log(JSON.stringify(newSurvey));
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
