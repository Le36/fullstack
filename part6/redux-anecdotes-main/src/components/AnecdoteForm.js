import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`added ${content}`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote"/>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {createAnecdote, setNotification}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
