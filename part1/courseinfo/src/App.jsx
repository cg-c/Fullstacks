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
      <Part part={parts.parts} />
    </>
  )
}

const Total = (total) => {
  return (
    <>
      <p>Number of exercises {total.total}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  // const parts = [
  //   {name: 'Fundamentals of React', num: 10},
  //   {name: 'Using props to pass data', num: 7}, 
  //   {name: 'State of a component', num: 14},
  // ]
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={part1} />
      <Content parts={part2} />
      <Content parts={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App