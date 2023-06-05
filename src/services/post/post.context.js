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
  GetAllPostSurveys,
  GetUserPostsCnt,
  GetPopularPost,
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
        GetAllPostSurveys, // 모든 게시물
        GetUserPostsCnt, // 유저가 올린 게시물 수 확인
        GetPopularPost, // 인기설문
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
