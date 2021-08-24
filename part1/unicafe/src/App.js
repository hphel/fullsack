import React, { useState } from 'react'

const Input = ({increaseGood, increaseNeutral, increaseBad}) => <div>
  <h5>give feedbacks</h5>
  <button onClick={increaseGood}>good</button>
  <button onClick={increaseNeutral}>neutral</button>
  <button onClick={increaseBad}>bad</button>
</div>

const StatisticLine = ({text, value}) => <tr><td>{text}</td> <td>{value}</td></tr>


const Statistics = ({good, neutral, bad}) => <div>
    <h5>statistics</h5>
    <table>
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={good + bad + neutral}></StatisticLine>
      <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)}></StatisticLine>
      <StatisticLine text="positive" value={`${good * 100 / (good + bad + neutral)} %`}></StatisticLine>
    </table>
  </div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const hasClick = () => good !== 0 || neutral !== 0 || bad !== 0

  
    return (
      <div>
        <Input increaseGood={() => setGood(good + 1)} increaseNeutral={() => setNeutral(neutral + 1)} increaseBad={() => setBad(bad + 1)}/>
        
        {
          hasClick() ? 
          <Statistics good={good} neutral={neutral} bad={bad}/> :
          <div>
            <h5>statistics</h5>
            <p>No feedback given</p>
          </div>
        }
        
      </div>
    )
}

export default App