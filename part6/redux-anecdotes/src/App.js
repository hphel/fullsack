import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, create } from './reducers/anecdoteReducer'
import { createNotification, clearNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms))
}

async function showNotification(dispatch, msg) {
  dispatch(createNotification(msg))
  await delay(5000)
  dispatch(clearNotification())
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    const sortedAnecdotes = [...anecdotes]
      .filter(a => !filter || a.content.toLowerCase().includes(filter))
    sortedAnecdotes.sort((a, b) => a.votes - b.votes)
    return sortedAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    const msg = anecdotes.find(a => a.id === id).content
    showNotification(dispatch, `You voted ${msg}`)
  }
  return <>{anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )}</>
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    dispatch(create(content))
    showNotification(dispatch, `You created ${content}`)
  }
  return <>
    <h2>create new</h2>
    <form onSubmit={createNew}>
      <div><input name="note" /></div>
      <button>create</button>
    </form>
  </>
}

export default App
