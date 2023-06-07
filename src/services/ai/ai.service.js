import axios from "axios";

const AI_API_URL = process.env.REACT_APP_AI_API_URL;

/* AI */

export const GetAIGenerate = async (topic) => {
    const body = {
        msg: `${topic}에 대한 주제로 설문지를 만들어줘. 만들어야 하는 스키마는 다음과 같아. {\"title\": \"string\", \"questions\": [{\"title\": \"string\", \"type\":\"SHORTFORM\", \"selections\": [],\"isRequired\": false, \"id\": 0},{\"title\": \"string\", \"type\": \"RADIO\",\"selections\": [{ \"type\": \"LETTER\", \"content\": \"string\"},{\"type\": \"LETTER\",\"content\": \"string\"}],\"isRequired\": false, \"id\": 1},{\"title\": \"string\",\"type\": \"CHECKBOX\",\"selections\": [{\"type\": \"LETTER\",\"content\": \"string\"},{\"type\": \"LETTER\",\"content\": \"string\"}],\"isRequired\": false, \"id\": 2}],\"description\": \"string\"} 위 형식으로 여러개의 questions를 만들어줘. 최소 4개 이상으로. 형식 앞뒤로 문자 \`\`\`로 구분해줘. json이라고 명시하지 말아줘. questions의 id는 반드시 0부터 시작해줘`,
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
