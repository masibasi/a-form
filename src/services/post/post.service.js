import axios from "axios";

const POST_API_URL = process.env.REACT_APP_POST_API_URL;

/* Category */

export const CreateCategory = async (categoryType, postPk) => {
    const res = axios
        .post(`${POST_API_URL}/api/postCategory/create`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

export const GetPostCategory = async (postPk) => {
    const res = axios
        .post(`${POST_API_URL}/api/postCategory/get/${postPk}`)
        .then((res) => {
            console.log(res);
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
            console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return res;
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
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    return res;
};

export const GetComments = async (postPk, size, page) => {
    const res = await axios
        .get(`${POST_API_URL}/api/comment/get/comments/${postPk}/${size}/${page}`)
        .then((res) => {
            console.log(res);
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
