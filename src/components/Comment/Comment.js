import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import "./Comment.css";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useContext, useState } from "react";
import { PostContext } from "../../services/post/post.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Comment = (props) => {
    const { DeleteComment, PostCommentLike } = useContext(PostContext);
    const { userData } = useContext(AuthenticationContext);
    const checkAuthor = () => {
        if (props.commentAuthor == userData.userPk) return true;
        return false;
    };
    const [show, setShow] = useState(false);
    const [liked, setLiked] = useState(false);

    const onEdit = () => {
        setShow(false);
    };
    const onDelete = async () => {
        await DeleteComment(props.commentPk);
        await props.getCommentData();
        setShow(false);
    };

    const onLikeClick = async () => {
        setLiked(true);
        await PostCommentLike(userData.userPk, props.commentPk);
        await props.getCommentData();
        alert("좋아요 되었습니다");
    };

    const popover = (
        <Popover>
            <Popover.Body className="commentPopover">
                {checkAuthor() ? (
                    <>
                        <button className="commentMoreBtn" onClick={onEdit}>
                            수정
                        </button>
                        <button className="commentMoreBtn" onClick={onDelete}>
                            삭제
                        </button>
                    </>
                ) : (
                    <>
                        <button className="commentMoreBtn" onClick={onDelete}>
                            신고하기
                        </button>
                    </>
                )}
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="Comment">
            <div className="commentLeft">
                <div className="nickname">{props.commentAuthor}</div>
                <div className="content"> {props.commentContent}</div>
            </div>
            <div className="commentRight">
                <div className="dateTimeWrapper">
                    <div className="date">
                        {props.createdDate[0]}. {props.createdDate[1]}. {props.createdDate[2]}. {props.createdDate[3]} : {props.createdDate[4]}
                    </div>
                </div>
                <div className="likes">좋아요 : {props.commentLike}개</div>
                <div onClick={onLikeClick}>{liked ? <AiFillHeart size={24} color="red" /> : <AiOutlineHeart size={24} />}</div>

                <OverlayTrigger trigger="click" placement="right" overlay={popover} delay={1} show={show}>
                    <button className="commentMoreBtn" onClick={() => setShow(!show)}>
                        <FiMoreVertical size={24} />
                    </button>
                </OverlayTrigger>
            </div>
        </div>
    );
};
