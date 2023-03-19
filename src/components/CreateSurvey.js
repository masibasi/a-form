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
  function addingQuestions(input){ 
    if(questions == null){
      questions.push({
        id:0,
        questiontype:input,
        questionTitle: "",
        item : [],


      })
    }
    else{
      questions.push({
      id: questions.length, 
      questiontype: input,
      questionTitle:"",
      item :[],

  
    })
  }
    setQuestions([...questions])

  }
  console.log(questions)
  return (
    <div className='createSurvey'>
      <Container>
        <Row>
          <Col>

            <h1>Create Survey</h1>
            <AddingOption addingQuestions={addingQuestions} ></AddingOption>
            <Form>
                {questions.map((q, index)=>{return <QuestionForm questiontype={q.questiontype} delfunction={delQuestions} q={q} questions={questions} setQuestions={setQuestions}/>})}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CreateSurvey 
