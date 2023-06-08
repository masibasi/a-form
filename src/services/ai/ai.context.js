import React, { createContext } from "react";
import { GetAIGenerate, GetAiAnalyse } from "./ai.service";
export const AIContext = createContext();

export const AIContextProvider = ({ children }) => {
    return (
        <AIContext.Provider
            value={{
                GetAIGenerate,
                GetAiAnalyse,
            }}
        >
            {children}
        </AIContext.Provider>
    );
};
