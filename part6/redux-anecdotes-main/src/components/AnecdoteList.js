import {useDispatch, useSelector} from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {removeNotification, setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const list = [...anecdotes]

    const voting = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setNotification(`voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <div>
            {list.sort((a, b) => b.votes - a.votes).map(anecdote =>
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