import React from 'react'
import Button from 'react-bootstrap/Button'
import { ButtonGroup } from 'react-bootstrap';

function AddingOption(props) {

  return (
<ButtonGroup aria-label='Basic example'>
  <Button variant='info' onClick={(event)=> {props.addingQuestions(1)}}>Radio</Button>
  <Button variant='info' onClick={(event)=> {props.addingQuestions(2)}}>CheckBox</Button>
  <Button variant='info' onClick={(event)=>{props.addingQuestions(3)}}>Shortform</Button>
</ButtonGroup>
  )
}

export default AddingOption