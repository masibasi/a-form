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
    console.log(JSON.stringify("newSurvey : ", newSurvey));
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
