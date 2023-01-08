import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteForm/>
            <AnecdoteList/>
            <Notification/>
        </div>
    )
}

export default App