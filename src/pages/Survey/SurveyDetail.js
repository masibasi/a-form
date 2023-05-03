import React, { useState, useEffect } from "react";
import "./SurveyDetail.css";
import { Button, Card, Collapse } from "react-bootstrap";
import { Comment } from "../../components/Comment";
import { useNavigate } from "react-router-dom";

export const SurveyDetail = () => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [mockComment, setMockComment] = useState([
        { author: "작성자", content: "wow! this survey is awesome" },
        { author: "작성자", content: "wow! this survey is awesome" },
        { author: "작성자", content: "wow! this survey is awesome" },
        { author: "작성자", content: "wow! this survey is awesome" },
    ]);
    const navigate = useNavigate();
    const addComment = () => {
        const newComment = { author: "작성자", content: comment };
        setMockComment([...mockComment, newComment]);
        setComment("");
    };
    return (
        <div className="SurveyDetail">
            <div>
                <div className="topWrapper">
                    <div className="descWrapper">
                        <div className="title">hi</div>
                        <div className="desc">hello</div>
                    </div>
                    <div className="buttonWrapper">
                        <Button
                            variant="primary"
                            onClick={() => navigate("/survey/32")}
                        >
                            Enter Survey
                        </Button>
                    </div>
                </div>
                <div className="statistics">
                    <h3>통계</h3>
                    <Button
                        variant=""
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        click
                    </Button>
                </div>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Card body style={{ width: "400px" }}>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                        </Card>
                    </div>
                </Collapse>
            </div>
            <div className="commentBox">
                {mockComment.map((it) => {
                    return <Comment author={it.author} content={it.content} />;
                })}
                <div className="commentBarWrapper">
                    <input
                        type="text"
                        className="commentBar"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button id="submitBtn" onClick={addComment}>
                        등록
                    </Button>
                </div>
            </div>
        </div>
    );
};
