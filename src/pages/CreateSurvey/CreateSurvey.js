import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../../components/forms/QuestionForm";
import AddingOption from "../../components/forms/AddingOption";
import Button from "react-bootstrap/Button";
import "../Survey/Survey.css";
import { ConfirmSurveyModal, LinkModal } from "../../components/Modal/ConfirmSurveyModal";
import { SurveyContext } from "../../services/survey/survey.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SiProbot } from "react-icons/si";
import FadeIn from "../../animation/FadeIn";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function CreateSurvey() {
  const mockData = {
    type: "NORMAL",
    title: "AI GENERATED FORM",
    deadline: "2023-05-09T13:10:54.310Z",
    questions: [
      {
        title: "당신은 사람입니까",
        type: "RADIO",
        selections: [
          {
            type: "LETTER",
            content: "예",
          },
          {
            type: "LETTER",
            content: "아니오",
          },
        ],
      },
      {
        title: "A-Form을 어떻게 알게 되었습니까",
        type: "CHECKBOX",
        selections: [
          {
            type: "LETTER",
            content: "TV를 통해서",
          },
          {
            type: "LETTER",
            content: "지인들이 알려줘서",
          },
          {
            type: "LETTER",
            content: "Instagram을 통해서",
          },
        ],
      },
    ],
    description: "string",
  };

  const [questions, setQuestions] = useState([]); //index, state(어떤 타입의 질문인지)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const nextCardId = useRef(0); // surveyCard 아이디

  // Create
  const { CreateSurvey, AIGenerateSurvey } = useContext(SurveyContext); // Form 작성 완료 handler를 context에서 불러온다
  // User Token, isLogin
  const { userToken, isLogin } = useContext(AuthenticationContext);

  const CheckLogin = () => {
    if (isLogin == false) {
      alert("로그인이 필요한 서비스 입니다.");
      navigate(-1);
    }
  };
  useEffect(() => {
    CheckLogin();
  }, []);
  /* Variables for modal */
  const [linkModalShow, setLinkModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [surveyId, setSurveyId] = useState("");

  /* Functions for modal */
  const handleClose = () => {
    setLinkModalShow(false);
    navigate("/");
  };
  const handleConfirmModalClose = () => {
    setConfirmModalShow(false);
  };
  // Submit
  const handleSubmit = async () => {
    const type = "NORMAL";
    setConfirmModalShow(false);
    let newId = await CreateSurvey(type, deadline, title, description, questions, userToken);
    setSurveyId(newId);
    setLinkModalShow(true);
  };
  // When click "Complete Form" Button
  const handleCreate = useCallback(
    (title) => {
      if (title === "") {
        alert("enter in a title");
        return;
      } else {
        setConfirmModalShow(true);
      }
    },
    [confirmModalShow]
  );

  // AI GENERATE
  const AIGenerateHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      const msg = "축구와 관련된 내용을 json으로 만들어줘";
      console.log(AIGenerateSurvey(msg, userToken));
      setTitle(mockData.title);
      setQuestions(mockData.questions);
      setIsLoading(false);
    }, 3000);
  };

  // TODO : X 표시를 누르면 해당 문제의 정보가 삭제된다.
  const delQuestion = useCallback((index) => {
    questions.splice(index, 1);
    nextCardId.current -= 1;
    setQuestions([...questions]);
  });

  const addQuestion = useCallback((input) => {
    if (questions == null) {
      questions.push({
        type: input,
        title: "",
        selections: [],
        id: nextCardId.current,
        isRequired: true, // 기본값을 true로 설정
      });
    } else {
      questions.push({
        type: input,
        title: "",
        selections: [],
        id: nextCardId.current,
        isRequired: true, // 기본값을 true로 설정
      });
    }
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
          {isLoading ? (
            <Button variant="primary" disabled>
              <Spinner className="icon" as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              AI Generate
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={AIGenerateHandler}>
              <SiProbot className="icon-svg" />
              AI Generate
            </Button>
          )}
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
    );
  });
  return (
    <div className="CreateSurvey Survey">
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
                        <QuestionForm
                          forCreate={true}
                          type={q.type}
                          delQuestion={delQuestion}
                          q={q}
                          qIndex={index}
                          questions={questions}
                          setQuestions={setQuestions}
                        />
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
