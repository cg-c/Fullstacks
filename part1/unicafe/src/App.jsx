import { useState } from 'react'

const Header = (text) => <h1>{text.text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = ((good / all) * 100) + "%"

  if (all == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App