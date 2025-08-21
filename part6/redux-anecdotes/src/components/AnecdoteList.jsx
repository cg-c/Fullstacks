import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotesList = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(a => {
            return a.content.toLowerCase().includes(filter.toLowerCase())
        }).sort((a, b) => b.votes - a.votes)
    })

    const vote = (anecdote) => {
        dispatch(toggleVote(anecdote))
        dispatch(setNotif(`You voted '${anecdote.content}'`, 10))
    }

    return (
        <div>
            {anecdotesList.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList