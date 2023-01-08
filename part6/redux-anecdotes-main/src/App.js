import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from "./components/Filter";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import anecdoteService from "./services/anecdoteService";
import {setAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService
            .getAll().then(notes => dispatch(setAnecdotes(notes)))
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            <AnecdoteForm/>
            <AnecdoteList/>
            <Notification/>
        </div>
    )
}

export default App