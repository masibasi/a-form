import React, { createContext } from "react";
import { GetAIGenerate } from "./ai.service";
export const AIContext = createContext();

export const AIContextProvider = ({ children }) => {
    return (
        <AIContext.Provider
            value={{
                GetAIGenerate,
            }}
        >
            {children}
        </AIContext.Provider>
    );
};
