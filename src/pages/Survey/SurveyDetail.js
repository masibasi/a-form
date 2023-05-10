import React, { useState, useEffect, useContext } from "react";
import "./SurveyDetail.css";
import { Button, Card, Collapse } from "react-bootstrap";
import { Comment } from "../../components/Comment/Comment";
import { useNavigate, useParams } from "react-router-dom";
import FadeIn from "react-fade-in/lib/FadeIn";

import { SurveyContext } from "../../services/servey/survey.context";

export const SurveyDetail = () => {
    const { GetSurveyById } = useContext(SurveyContext);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [mockComment, setMockComment] = useState([
        { author: "작성자", content: "wow! this survey is awesome", id: 0 },
        { author: "작성자", content: "wow! this survey is awesome", id: 1 },
        { author: "작성자", content: "wow! this survey is awesome", id: 2 },
        { author: "작성자", content: "wow! this survey is awesome", id: 3 },
    ]);
    const [surveyData, setSurveyData] = useState("");
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const addComment = () => {
        const newComment = { author: "작성자", content: comment };
        setMockComment([...mockComment, newComment]);
        setComment("");
    };
    const { id } = useParams();
    const getSurveyData = async () => {
        let data = await GetSurveyById(id);
        setSurveyData(data.data);
        setLoaded(true);
    };
    useEffect(() => {
        getSurveyData();
    }, []);
    const CommentInput = () => {
        return;
    };
    const CommentBox = React.memo(() => {
        return (
            <div className="commentBox">
                {mockComment.map((it) => {
                    return <Comment author={it.author} content={it.content} key={it.id} />;
                })}
            </div>
        );
    });
    return (
        <>
            {loaded ? (
                <div className="SurveyDetail Survey">
                    <FadeIn className="surveyWrapper" childClassName="childClassName">
                        <div className="contentWrapper">
                            <div className="topWrapper">
                                <div className="descWrapper">
                                    <div className="title">{surveyData.title}</div>
                                    <div className="desc">{surveyData.description}</div>
                                </div>
                                <div className="buttonWrapper">
                                    <Button variant="primary" onClick={() => navigate(`/survey/${id}`)}>
                                        Enter Survey
                                    </Button>
                                </div>
                            </div>
                            <div className="statistics">
                                <h3>통계</h3>
                                <Button variant="" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
                                    click
                                </Button>
                            </div>
                        </div>

                        <Collapse in={open}>
                            <div id="example-collapse-text">
                                <Card body style={{ width: "400px" }}>
                                    {surveyData.statistics}
                                </Card>
                            </div>
                        </Collapse>

                        <CommentBox />
                        <div className="commentBarWrapper">
                            <input type="text" className="commentBar" value={comment} onChange={(e) => setComment(e.target.value)} />
                            <Button id="submitBtn" onClick={addComment}>
                                등록
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            ) : (
                <div className="SurveyDetail Survey"></div>
            )}
        </>
    );
};
