import React, { createContext } from "react";
import {
    CreatePost,
    GetPost,
    PostComment,
    GetComments,
    DeleteComment,
    CreateCategory,
    GetPostCategory,
    GetPostSurveys,
    GetCommentCnt,
    PostCommentLike,
    GetAllCategory,
    UpdateViews,
} from "./post.service";
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
                GetPostSurveys,
                GetCommentCnt, // 댓글의 수를 받는
                PostCommentLike,
                GetAllCategory,
                UpdateViews, // 게시글 조회수 올려주는
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
