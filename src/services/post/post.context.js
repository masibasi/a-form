import React, { createContext } from "react";
import { CreatePost, GetPost, PostComment, GetComments, DeleteComment, CreateCategory, GetPostCategory, GetCommentCnt } from "./post.service";
export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    return (
        <PostContext.Provider
            value={{
                CreatePost,
                GetPost,
                PostComment,
                GetComments,
                DeleteComment,
                CreateCategory,
                GetPostCategory,
                GetCommentCnt, // 댓글의 수를 받는
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
