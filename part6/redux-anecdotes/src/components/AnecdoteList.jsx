import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'
import { changeNotif, clearNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(toggleVote(anecdote.id))
        dispatch(changeNotif(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(clearNotif())
        }, 5000)
    }

    const filter = useSelector(state => state.filter)

    const filterAnecdotes = anecdotes.filter(a =>{
        return a.content.toLowerCase().includes(filter.toLowerCase())
    }).sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {filterAnecdotes.map(anecdote =>
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