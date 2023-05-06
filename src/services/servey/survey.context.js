import React, { createContext } from "react";

import { createSurvey } from "./survey.service";

export const SurveyContext = createContext();

export const SurveyContextProvider = ({ children }) => {
    return (
        <SurveyContext.Provider
            value={{
                createSurvey,
            }}
        >
            {children}
        </SurveyContext.Provider>
    );
};
