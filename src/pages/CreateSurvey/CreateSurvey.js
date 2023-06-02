import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionForm from "../../components/forms/QuestionForm";
import AddingOption from "../../components/forms/AddingOption";
import Button from "react-bootstrap/Button";
import "../Survey/Survey.css";
import { ConfirmSurveyModal, LinkModal } from "../../components/Modal/ConfirmSurveyModal";
import { SurveyContext } from "../../services/survey/survey.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { PostContext } from "../../services/post/post.context";

import { SiProbot } from "react-icons/si";
import FadeIn from "../../animation/FadeIn";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AIContext } from "../../services/ai/ai.context";
import { AIGenerateModal } from "../../components/Modal/AIGenerateModal";
import { Firework } from "../../animation/Firework";

function CreateSurvey() {
    // Navigation
    const navigate = useNavigate();
    const location = useLocation();

    // Context
    const { userToken, isLogin, userData } = useContext(AuthenticationContext); // User Token, isLogin
    const { CreateSurvey, GetSurveyById } = useContext(SurveyContext); // Survey
    const { CreatePost, CreateCategory } = useContext(PostContext); // Post
    const { GetAIGenerate } = useContext(AIContext); // AI

    // survey state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]); //index, state(어떤 타입의 질문인지)
    const [surveyId, setSurveyId] = useState("");
    const [postPk, setPostPk] = useState("");
    const nextCardId = useRef(0); // surveyCard 아이디

    // Modal state
    const [linkModalShow, setLinkModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [AIModalShow, setAIModalShow] = useState(true);

    const CheckLogin = () => {
        if (!localStorage.getItem("isLoggedIn")) {
            alert("로그인이 필요한 서비스 입니다.");
            navigate(-1);
        }
        templateLoader();
    };

    // textarea state
    const textarea1 = useRef();
    const textarea2 = useRef();
    const handleResizeHeight = (textarea) => {
        textarea.current.style.height = 0; //height 초기화
        textarea.current.style.height = textarea.current.scrollHeight + "px";
    };

    // onTemplate Load
    const templateLoader = () => {
        if (location.state != null) {
            setAIModalShow(false);
            setSurveyId(location.state.id);
            GetSurveyById(location.state.id).then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setQuestions(
                    res.data.questions.map((it, index) => {
                        it.id = index;
                        return it;
                    })
                );
                nextCardId.current = res.data.questions.length;
                toast.success("Template Loaded!");
            });
        }
    };
    useEffect(() => {
        CheckLogin();
    }, []);

    const toastPromise = (promise) => {
        toast.promise(promise, {
            pending: "pending",
            success: {
                render() {
                    return `Complete!`;
                },
                onClose: () => setConfirmModalShow(true),
            },
            error: "rejected 🤯",
        });
    };

    // Save Form state
    const [saveIsLoading, setSaveIsLoading] = useState(false);
    const checkFormFilled = () => {
        if (title === "") {
            alert("enter in a title");
            return false;
        }
        if (description === "") {
            alert("enter description");
            return false;
        }
        if (questions.length === 0) {
            alert("Add at least one question!");
            return false;
        }
        let checkQTitle = true;
        let checkQContent = true;
        let checkQSelections = true;
        questions.forEach((q) => {
            console.log(q.title);
            console.log(q);
            console.log(questions);
            if (q.title == "") {
                checkQTitle = false;
            }
            if (q.type !== "SHORTFORM" && q.selections.length === 0) {
                checkQSelections = false;
            }
            q.selections.forEach((selection) => {
                if ((q.type === "RADIO" || q.type === "CHECKBOX") && selection.content == "") {
                    checkQContent = false;
                }
            });
        });
        if (!checkQTitle) {
            alert("All Survey Cards need a title");
            return false;
        }
        if (!checkQSelections) {
            alert("Add at least one selection!");
            return false;
        }
        if (!checkQContent) {
            alert("All Survey Card's selection need a content");
            return false;
        }
        return true;
    };
    const saveSurveyHandler = () => {
        if (!aiIsLoading && checkFormFilled()) {
            setSaveIsLoading(true);
            toastPromise(handleSubmit);
            setTimeout(() => {
                setSaveIsLoading(false);
            }, 3000);
        }
    };

    // Submit
    const handleSubmit = async () => {
        const type = "NORMAL";
        setConfirmModalShow(false);
        let newId = await CreateSurvey(type, title, description, questions, userToken);
        setSurveyId(newId);
    };

    // Create Post
    const createPostHandler = async (startDate, endDate, category) => {
        await CreatePost(title, description, surveyId, startDate, endDate, userData.userPk)
            .then((res) => {
                setPostPk(res.postPk);
                CreateCategory(category, res.postPk);
                setConfirmModalShow(false);
                setLinkModalShow(true);
            })
            .catch((err) => console.log(err));
    };

    // AI //
    const [aiIsLoading, setAiIsLoading] = useState(false);
    const AIGenerateHandler = (title) => {
        if (!saveIsLoading) {
            setAiIsLoading(true);
            console.log(
                GetAIGenerate(title).then((res) => {
                    let data = res.split("```");
                    console.log(data);
                    if (data[1].indexOf("json")) {
                        data[1] = data[1].replace("json", "");
                        console.log(data[1]);
                    }
                    const dataJSON = JSON.parse(data[1]);
                    console.log(dataJSON);
                    setTitle(dataJSON.title);
                    setQuestions(dataJSON.questions);
                    setDescription(dataJSON.description);
                    setAiIsLoading(false);
                    setAIModalShow(false);
                    Firework();
                })
            );
        }
    };

    /* Modal */

    // Modal Function
    const handleClose = () => {
        setLinkModalShow(false);
        navigate("/");
    };
    const handleConfirmModalClose = () => {
        setConfirmModalShow(false);
    };

    // TODO : X 표시를 누르면 해당 문제의 정보가 삭제된다.
    const delQuestion = useCallback((index) => {
        questions.splice(index, 1);
        nextCardId.current -= 1;
        setQuestions([...questions]);
    });

    const addQuestion = useCallback((input) => {
        questions.push({
            type: input,
            title: "",
            selections: [],
            id: nextCardId.current,
            isRequired: false, // 기필수응답
        });

        nextCardId.current += 1;
        setQuestions([...questions]);
    });

    /*--------드래그 앤 드롭 부분 ----------*/
    const handleDragEnd = (result) => {
        // 핸들 드래그 종료 함수
        if (!result.destination) {
            // 드래그 대상이 리스트 외부로 드롭되면 아무 작업도 수행하지 않음
            return;
        }

        const reorderedQuestions = reorder(questions, result.source.index, result.destination.index); // 원본 리스트에서 드래그 대상을 재배치하여 새 리스트를 생성함

        setQuestions(reorderedQuestions); // 새로운 순서를 적용하여 질문 상태를 업데이트함
    };

    const reorder = (list, startIndex, endIndex) => {
        // 리스트 재배치 함수
        const result = Array.from(list); // 원본 리스트를 복사하여 새 리스트를 생성함
        const [removed] = result.splice(startIndex, 1); // 시작 인덱스에서 요소를 제거하고 그 요소를 저장함

        result.splice(endIndex, 0, removed); // 끝 인덱스에 제거한 요소를 삽입

        return result; // 재배치된 새 리스트를 반환
    };

    const FormBtnWrapper = React.memo(() => {
        return (
            <div className="ButtonWrapper">
                <AddingOption addQuestion={addQuestion}></AddingOption>
                <div className="SurveyBtnWrapper">
                    <Button variant={aiIsLoading ? "primary" : "outline-primary"} disabled={aiIsLoading} onClick={aiIsLoading ? null : () => setAIModalShow(true)}>
                        {aiIsLoading ? <Spinner className="icon" as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : <SiProbot className="icon-svg" />}
                        AI Generate
                    </Button>

                    <Button className="submit-btn" type="submit" variant="outline-success" disabled={saveIsLoading} onClick={saveIsLoading ? null : () => saveSurveyHandler()}>
                        Save Form
                    </Button>

                    <Button className="delete-btn" type="submit" variant="outline-danger" onClick={() => navigate("/", { replace: true })}>
                        Delete Form
                    </Button>
                </div>
            </div>
        );
    });
    return (
        <div className="CreateSurvey Survey">
            <FadeIn className="surveyWrapper" childClassName="childClassName">
                <ConfirmSurveyModal modalShow={confirmModalShow} handleModalClose={handleConfirmModalClose} onSubmit={createPostHandler} />
                <LinkModal modalShow={linkModalShow} handleModalClose={handleClose} postPk={postPk} />
                <AIGenerateModal show={AIModalShow} setShow={setAIModalShow} aiIsLoading={aiIsLoading} AIGenerateHandler={AIGenerateHandler} />
                <div className="text-wrapper">
                    <textarea
                        className="surveyTitle"
                        ref={textarea1}
                        type="text"
                        value={title}
                        placeholder="Create Form"
                        onChange={(e) => {
                            setTitle(e.target.value);
                            handleResizeHeight(textarea1);
                        }}
                    />

                    <textarea
                        className="surveyDesc"
                        ref={textarea2}
                        type="text"
                        value={description}
                        placeholder="Form Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                            handleResizeHeight(textarea2);
                        }}
                    />
                </div>
                <FormBtnWrapper />

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <Form className="Form" ref={provided.innerRef} {...provided.droppableProps}>
                                {questions.map((q, index) => (
                                    <Draggable key={q.id} draggableId={`draggable-${q.id}`} index={index}>
                                        {(provided) => (
                                            <div
                                                className="draggableFormWrapper"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ ...provided.draggableProps.style }}
                                            >
                                                <QuestionForm forCreate={true} type={q.type} delQuestion={delQuestion} q={q} qIndex={index} questions={questions} setQuestions={setQuestions} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Form>
                        )}
                    </Droppable>
                </DragDropContext>
            </FadeIn>
        </div>
    );
}

export default CreateSurvey;
