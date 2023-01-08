import {useDispatch, useSelector} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const list = [...anecdotes]

    const voting = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5))
    }

    return (
        <div>
            {list.filter(anecdotes => anecdotes.content.toLowerCase()
                .includes(filter.toLowerCase()))
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => voting(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList