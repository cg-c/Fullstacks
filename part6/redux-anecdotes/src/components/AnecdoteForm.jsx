import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotif, clearNotif } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAne = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        dispatch(createAnecdote(content))
        dispatch(changeNotif(`You created '${content}'`))
        setTimeout(() => {
            dispatch(clearNotif())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAne}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm