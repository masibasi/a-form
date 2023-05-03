import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import "./Comment.css";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";

export const Comment = ({ author, content }) => {
    const [show, setShow] = useState(false);
    const onEdit = () => {
        setShow(false);
    };
    const onDelete = () => {
        setShow(false);
    };
    const popover = (
        <Popover>
            <Popover.Body className="commentPopover">
                <button className="commentMoreBtn" onClick={onEdit}>
                    수정
                </button>
                <button className="commentMoreBtn" onClick={onDelete}>
                    삭제
                </button>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="Comment">
            <div className="commentLeft">
                <div className="nickname">{author}</div>
                <div className="content"> {content}</div>
            </div>

            <OverlayTrigger
                trigger="click"
                placement="left"
                overlay={popover}
                delay={1}
                show={show}
            >
                <button
                    className="commentMoreBtn"
                    onClick={() => setShow(!show)}
                >
                    <FiMoreVertical />
                </button>
            </OverlayTrigger>
        </div>
    );
};
