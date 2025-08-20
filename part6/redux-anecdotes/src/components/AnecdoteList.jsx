import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(toggleVote(id))
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList