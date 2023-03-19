import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import QuestionForm from './forms/QuestionForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateSurveyForm() {
  const [item, setItem] = useState({
    id: 1,
    title: "test",
    description: "testtest",
    selection: [null, null]
  });

  return (
    <div className='createSurvey'>
      <Container>
        <Row>
          <Col>
            <h1>Create Survey</h1>
            <Form>
              <QuestionForm item={item} setItem={setItem} />
              <QuestionForm item={item} setItem={setItem} />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CreateSurveyForm 
