import React from 'react'
import { Button } from 'react-bootstrap'

export default function Home() {
  return (
    <div className='Home'>
      <h1>A-Form</h1>
      <p>A onine form for everyone</p>
      <Button>About Form</Button>{' '}
      <Button variant="outline-primary">Create Form</Button>
    </div>
  )
}
