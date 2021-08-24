import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)
  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const mostVoteIdx = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <div>
        <h3>Anecdote of the day</h3>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={vote}>vote</button>
        <button onClick={selectRandom}>next anecdote</button>
      </div>
      <div>
        <h3>Anecdote with most vote</h3>
        <p>{anecdotes[mostVoteIdx]}</p>
        <p>has {votes[mostVoteIdx]} votes</p>
      </div>
      
    </div>
  )
}

export default App