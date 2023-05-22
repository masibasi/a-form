import React, { createContext } from "react";
import { CreatePost, GetPost } from "./post.service";
export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    return <PostContext.Provider value={{ CreatePost, GetPost }}>{children}</PostContext.Provider>;
};
