import axios from "axios";

const POST_API_URL = process.env.REACT_APP_POST_API_URL;

/* Category */

export const CreateCategory = async (categoryType, postPk) => {
    const body = {
        categoryType: categoryType,
        postPk: postPk,
    };
    const res = axios
        .post(`${POST_API_URL}/api/postCategory/create`, body)
        .then((res) => console.log("CreateCategoryRes : ", res))
        .catch((err) => console.log("CreateCategoryErr : ", err));
    return res;
};

export const GetPostCategory = async (postPk) => {
    const res = axios
        .get(`${POST_API_URL}/api/postCategory/get/${postPk}`)
        .then((res) => {
            console.log("postCat : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
    return res;
};

export const GetAllCategory = async () => {
    const res = axios
        .get(`${POST_API_URL}/api/category/getAll`)
        .then((res) => {
            console.log("categories : ", res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
    return res;
};

/* Post */

export const CreatePost = async (postTitle, postDesc, postSurvey, startDate, endDate, userPk) => {
    // send newSurvey to database
    const options = { headers: { accept: "application/json", "Content-Type": "application/json" } };
    const newPost = {
        postTitle: postTitle,
        postDesc: postDesc,
        postSurvey: postSurvey,
        author: userPk,
        postStartDate: startDate,
        postDueDate: endDate,
    };
    console.log("newPost : ", newPost);

    const postId = await axios
        .post(`${POST_API_URL}/api/post/create`, newPost, options)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return postId;
};

export const GetPost = async (postPk) => {
    const res = await axios
        .get(`${POST_API_URL}/api/post/getPost/${postPk}`)
        .then((response) => {
            console.log("Post data get : ", response.data);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return res;
};

export const UpdateViews = async (postPk) => {
    const res = await axios
        .post(`${POST_API_URL}/api/post/updateViews/${postPk}`)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
};
/* Comment */

export const PostComment = async (commentAuthor, commentContent, postPk) => {
    const newComment = {
        commentAuthor: commentAuthor,
        commentContent: commentContent,
        commentPost: postPk,
    };
    console.log("new comment : ", newComment);
    const res = await axios
        .post(`${POST_API_URL}/api/comment/create`, newComment)
        .then((res) => console.log("댓글 생성 결과 : ", res))
        .catch((err) => console.log(err));
    return res;
};

export const GetComments = async (postPk, size, page) => {
    const res = await axios
        .get(`${POST_API_URL}/api/comment/get/comments/${postPk}/${size}/${page}`)
        .then((res) => {
            console.log("댓글 data :", res);
            return res;
        })
        .catch((err) => console.log(err));

    return res;
};

export const DeleteComment = async (commentPk) => {
    await axios
        .delete(`${POST_API_URL}/api/comment/delete/${commentPk}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

export const GetCommentCnt = async (postPk) => {
    const res = await axios
        .get(`${POST_API_URL}/api/comment/commentCnt/${postPk}`)
        .then((res) => {
            console.log("댓글 총 수 : ", res);
            return res;
        })
        .catch((err) => console.log(err));
    return res;
};

export const PostCommentLike = async (userPk, commentPk) => {
    const body = {
        commentLikeUser: userPk,
        commentPk: commentPk,
    };
    await axios
        .post(`${POST_API_URL}/api/commentLike/likeButtonClicked`, body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

export const GetPostSurveys = async (userPk, itemNum, pageIndex) => {
    console.log(userPk, itemNum, pageIndex);
    const options = { headers: { accept: "application/json", "Content-Type": "application/json" } };
    const result = await axios
        .get(`${POST_API_URL}/api/post/getUserPosts/${userPk}/${itemNum}/${pageIndex}`, options)
        .then((res) => {
            console.log("getpost", res);
            return res.data;
        })
        .catch((err) => console.log(err));
    return result;
};
