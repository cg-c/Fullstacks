const Header = (course) => {
  return (
    <>
      <h1>{course.course}</h1>
    </> 
  )
}

const Part = (prop) => {
  return (
    <>
      <p>{prop.part.name} {prop.part.exercises}</p>
    </>
  )
}

const Content = (parts) => {
  return (
    <>
      <Part part={parts.parts[0]} />
      <Part part={parts.parts[1]} />
      <Part part={parts.parts[2]} />
    </>
  )
}

const Total = (parts) => {
  let total = 0

  parts.parts.forEach(val => {
    total += val.exercises
  })

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App