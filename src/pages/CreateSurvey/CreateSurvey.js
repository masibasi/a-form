import React, { useState, useRef, useContext } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../../components/forms/QuestionForm";
import AddingOption from "../../components/forms/AddingOption";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FormHandlingContext, IdContext } from "../../App";
import "./CreateSurvey.css";
import { ConfirmSurveyModal, LinkModal } from "../../components/ConfirmSurveyModal";
import FadeIn from "react-fade-in/lib/FadeIn";
function CreateSurvey() {
    const [questions, setQuestions] = useState([]); //index, state(어떤 타입의 질문인지)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const nextCardId = useRef(0); // surveyCard 아이디

    const { onCreate } = useContext(FormHandlingContext); // Form 작성 완료 handler를 context에서 불러온다
    /* Variables for modal */
    const [linkModalShow, setLinkModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [deadline, setDeadline] = useState("");
    const [surveyId, setSurveyId] = useState("");
    const handleClose = () => {
        setLinkModalShow(false);
        // navigate("/");
    };
    const handleConfirmModalClose = () => {
        setConfirmModalShow(false);
    };

    const handleSubmit = async () => {
        const type = "NORMAL";
        setConfirmModalShow(false);
        let newId = await onCreate(type, deadline, title, description, questions);
        setSurveyId(newId);
        setLinkModalShow(true);
    };

    const handleCreate = () => {
        if (title === "") {
            alert("enter in a title");
            return;
        } else {
            setConfirmModalShow(true);
        }
    };

    // TODO : X 표시를 누르면 해당 문제의 정보가 삭제된다.
    function delQuestion(index) {
        questions.splice(index, 1);
        nextCardId.current -= 1;
        setQuestions([...questions]);
    }

    function addQuestion(input) {
        if (questions == null) {
            questions.push({
                type: input,
                title: "",
                selections: [],
                id: nextCardId.current,
            });
        } else {
            questions.push({
                type: input,
                title: "",
                selections: [],
                id: nextCardId.current,
            });
        }
        nextCardId.current += 1;
        setQuestions([...questions]);
    }

    return (
        <div className="CreateSurvey">
            <FadeIn className="surveyWrapper" childClassName="childClassName">
                <ConfirmSurveyModal modalShow={confirmModalShow} handleModalClose={handleConfirmModalClose} onSubmit={handleSubmit} />
                <LinkModal modalShow={linkModalShow} handleModalClose={handleClose} surveyId={surveyId} />
                <div className="text-wrapper">
                    <input
                        className="surveyTitle"
                        type="text"
                        value={title}
                        placeholder="Create Form"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />

                    <input
                        className="surveyDesc"
                        type="text"
                        value={description}
                        placeholder="Form Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>
                <div className="ButtonWrapper">
                    <AddingOption addQuestion={addQuestion}></AddingOption>
                    <div className="SurveyBtnWrapper">
                        <Button
                            className="submit-btn"
                            type="submit"
                            variant="outline-success"
                            onClick={() => {
                                handleCreate();
                            }}
                        >
                            Complete Form
                        </Button>
                        <Button className="delete-btn" type="submit" variant="outline-danger" onClick={() => navigate("/", { replace: true })}>
                            Delete Form
                        </Button>
                    </div>
                </div>
                <Form className="Form">
                    {questions.map((q, index) => {
                        return <QuestionForm forCreate={true} type={q.type} delQuestion={delQuestion} q={q} qIndex={index} key={q.id} questions={questions} setQuestions={setQuestions} />;
                    })}
                </Form>
                {/* </FadeIn> */}
            </FadeIn>
        </div>
    );
}

export default CreateSurvey;
