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
      <p>{prop.part.name} {prop.part.num}</p>
    </>
  )
}

const Content = (parts) => {
  // let all = []

  // for (const item of parts.parts) {
  //   all.push(<p>{item.name} {item.num}</p>)
  // }

  // return (
  //     <>
  //       {all}
  //     </>
  //   )

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

  for (const i of parts.parts) {
    total += i.num
  }

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', num: 10},
    {name: 'Using props to pass data', num: 7}, 
    {name: 'State of a component', num: 14},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App