import React, { createContext } from "react";

import { CreateSurvey } from "./survey.service";
import { GetSurveyData, GetSurveyById, PostSurveyAnswer, AIGenerateSurvey, DeleteSurvey, getAnsweredSurveys } from "./survey.service";

export const SurveyContext = createContext();

export const SurveyContextProvider = ({ children }) => {
  return (
    <SurveyContext.Provider
      value={{
        CreateSurvey, // 서베이를 생성할 때 호출하는 함수
        DeleteSurvey, // 서베이를 삭제하는 함수
        GetSurveyData, // 서베이 데이터를 가져올 때 호출하는 함수
        GetSurveyById, // 서베이를 id로 하나 호출하는 함수
        PostSurveyAnswer, // 서베이 응답을 제출하는 함수
        AIGenerateSurvey, //AI로부터 Survey를 생성 요청하는 함수
        getAnsweredSurveys,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
