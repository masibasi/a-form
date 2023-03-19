import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import QuestionForm from './forms/QuestionForm';
import AddingOption from './forms/AddingOption';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateSurvey() {
  const [questions, setQuestions] = useState([]); //index, state(어떤 타입의 질문인지)
  
  // TODO : X 표시를 누르면 해당 문제의 정보가 삭제된다.
  function delQuestions (index){ 
    
    var result = questions.filter(function(value) {
      console.log("index: ", index, " value.id", value.id)
    return value.id !== index; 
});
  console.log(result)
    setQuestions([...result])
  }
  // TODO : input 값에 따라 추가되는 문제의 형식이 다르다
  function addingQuestions(input){ 
    if(questions == null){
      questions.push({
        id:1,
        questiontype:input
      })
    }
    else{
      questions.push({
      id: questions.length+1, 
      questiontype: input,
    })
  }
    setQuestions([...questions])

  }
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
            <AddingOption addingQuestions={addingQuestions} ></AddingOption>
            <Form>
                {questions.map((q, index)=>{return <QuestionForm item={item} questiontype={q.questiontype} delfunction={delQuestions} index={q.id}/>})}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CreateSurvey 
