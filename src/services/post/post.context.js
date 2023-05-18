import React, { createContext } from "react";
import { CreatePost } from "./post.service";
export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    return <PostContext.Provider value={{ CreatePost }}>{children}</PostContext.Provider>;
};
