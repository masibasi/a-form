import React, { createContext } from "react";

import { CreateSurvey } from "./survey.service";

export const SurveyContext = createContext();

export const SurveyContextProvider = ({ children }) => {
    return (
        <SurveyContext.Provider
            value={{
                CreateSurvey,
            }}
        >
            {children}
        </SurveyContext.Provider>
    );
};
