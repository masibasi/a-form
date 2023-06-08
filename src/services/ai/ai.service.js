import axios from "axios";

const AI_API_URL = process.env.REACT_APP_AI_API_URL;

/* AI */

export const GetAIGenerate = async (topic) => {
    const body = {
        msg: `${topic}에 대한 주제로 설문지를 만들어줘. 만들어야 하는 스키마는 다음과 같아. {\"title\": \"string\", \"type\": \"NORMAL\", \"questions\": [{\"title\": \"string\", \"type\":\"SHORTFORM\", \"selections\": [],\"isRequired\": false, \"id\": 0},{\"title\": \"string\", \"type\": \"RADIO\",\"selections\": [{ \"type\": \"LETTER\", \"content\": \"string\"},{\"type\": \"LETTER\",\"content\": \"string\"}],\"isRequired\": false, \"id\": 1},{\"title\": \"string\",\"type\": \"CHECKBOX\",\"selections\": [{\"type\": \"LETTER\",\"content\": \"string\"},{\"type\": \"LETTER\",\"content\": \"string\"}],\"isRequired\": false, \"id\": 2}],\"description\": \"string\"} 위 형식으로 여러개의 questions를 만들어줘. 최소 4개 이상으로. 형식 앞뒤로 문자 \`\`\`로 구분해줘. json이라고 명시하지 말아줘. questions의 id는 반드시 0부터 시작해줘`,
    };
    const res = axios
        .post(`${AI_API_URL}/chatbot`, body)
        .then((res) => {
            console.log("AIGEN RES : ", res);
            return res.data;
        })
        .catch((err) => console.log("AIGEN ERR : ", err));
    return res;
};

export const GetAiAnalyse = async (surveyData, statsData) => {
    console.log("AI send Stat : ", statsData);
    console.log("AI send Question : ", surveyData);
    const body = {
        msg: `내가 설문과 응답 JSON을 각각 보내줄테니까 설문 결과를 분석해줘.
        설문 데이터 : ${surveyData}
        응답 데이터 : ${statsData}
        응답 데이터 array의 각 항목의 순서는 설문 데이터의 questions의 순서와 대응돼.
        응답 데이터 array의 각 항목의 answer 숫자는 설문 데이터의 questions 속 selections의 각 항목의 index와 대응돼.
        결과를 분석하고 위 결과에 대한 사람들의 경향을 분석해줘.
        `,
    };
    const res = axios
        .post(`${AI_API_URL}/chatbot`, body)
        .then((res) => {
            console.log("AI분석 RES : ", res);
            return res.data;
        })
        .catch((err) => {
            console.log("AIGEN ERR : ", err);
            return err;
        });
    return res;
};
