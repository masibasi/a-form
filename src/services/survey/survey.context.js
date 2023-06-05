import React, { createContext } from "react";

import { CreateSurvey } from "./survey.service";
import {
  GetSurveyData,
  GetSurveyById,
  PostSurveyAnswer,
  DeleteSurvey,
  GetAnsweredSurveys,
  GetPostedSurveys,
  CreateAvsBSurvey,
  PostFiles,
  // GetPopularSurveys,
  GetStats,
} from "./survey.service";

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
        GetAnsweredSurveys, //응답한 survey를 요청하는 함수
        GetPostedSurveys, // 템플릿 받아오는 함수
        // GetPopularSurveys, //인기설문 받아오는 함수
        CreateAvsBSurvey,
        PostFiles,
        GetStats, // 통계 받아오는 함수
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
