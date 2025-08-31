import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      // const anecdotes = queryClient.getQueriesData(['anecdotes'])
      // queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    dispatch({ type: 'SET_MESS', payload: `anecdote '${content}' created`})
    setTimeout(() => {
      dispatch({ type: 'CLEAR_MESS'})
    }, 5000)
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
