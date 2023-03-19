import React from 'react'
import { Button } from 'react-bootstrap'

export default function Home() {
  return (
    <div className='Home'>
      <h1>A-Form</h1>
      <p>A onine form for everyone</p>
      <Button href='/create'>Create Form</Button>{' '}
      <Button href='/about' variant="outline-primary">About Form</Button>
    </div>
  )
}
