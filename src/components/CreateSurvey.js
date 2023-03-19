import React, { useState } from "react";
import { Form } from "react-bootstrap";
import QuestionForm from "./forms/QuestionForm";
import AddingOption from "./forms/AddingOption";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function CreateSurvey() {
  const [questions, setQuestions] = useState([]); //index, state(어떤 타입의 질문인지)

  // TODO : X 표시를 누르면 해당 문제의 정보가 삭제된다.
  function delQuestion(index) {
    questions.splice(index, 1);
    setQuestions([...questions]);
  }

  function addQuestion(input) {
    if (questions == null) {
      questions.push({
        questionType: input,
        questionTitle: "",
        item: [],
      });
    } else {
      questions.push({
        questionType: input,
        questionTitle: "",
        item: [],
      });
    }
    setQuestions([...questions]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(questions);
  }

  return (
    <div className="createSurvey">
      <Container>
        <Row>
          <Col>
            <h1>Create Survey</h1>
            <AddingOption addQuestion={addQuestion}></AddingOption>
            <Form onSubmit={handleSubmit}>
              {questions.map((q, index) => {
                return (
                  <QuestionForm
                    questionType={q.questionType}
                    delQuestion={delQuestion}
                    q={q}
                    qIndex={index}
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                );
              })}
              <Button type="submit" variant="danger">
                Create Survey
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateSurvey;
