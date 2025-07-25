import { useState } from 'react'

const Header = (text) => <h1>{text.text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, num }) => <p>{text} {num}</p>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = ((good / all) * 100) + "%"

  return (
    <>
      <Display text="all" num={all} />
      <Display text="average" num={average} />
      <Display text="positive" num={positive} />
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Header text="statistics" />
      <Display text="good" num={good} />
      <Display text="neutral" num={neutral} />
      <Display text="bad" num={bad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App