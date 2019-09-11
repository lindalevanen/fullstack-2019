import React from 'react'

const Header = (props) => (
  <h3>{props.course}</h3>
)

const Content = ({parts}) => (
  parts.map(part => (
    <Part key={part.id} part={part} />
  ))
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
  const total = parts.reduce((total, current) => total + current.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({courses}) => (
  courses.map((course, i) => (
    <div key={i}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ))
  
)

export default Course