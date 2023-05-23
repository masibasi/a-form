import React, { createContext } from "react";
import { CreatePost, GetPost, PostComment, GetComments, DeleteComment } from "./post.service";
export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    return <PostContext.Provider value={{ CreatePost, GetPost, PostComment, GetComments, DeleteComment }}>{children}</PostContext.Provider>;
};
