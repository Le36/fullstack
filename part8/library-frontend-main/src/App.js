import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import {useApolloClient, useSubscription} from "@apollo/client";
import Recommend from "./components/recommend";
import {ALL_BOOKS, BOOK_ADDED} from "./queries";

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    useSubscription(BOOK_ADDED, {
        onData: ({data}) => {
            const addedBook = data.data.bookAdded
            window.alert(`new book added ${addedBook.title}`)

            client.cache.updateQuery({query: ALL_BOOKS}, ({allBooks}) => {
                return {
                    allBooks: allBooks.concat(addedBook)
                }
            })
        }
    })

    if (!token) {
        return (
            <div>
                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('login')}>login</button>
                </div>

                <Authors show={page === 'authors'} token={token}/>

                <Books show={page === 'books'}/>

                <LoginForm show={page === 'login'} setToken={setToken}></LoginForm>
            </div>
        )
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
                <button onClick={() => logout()}>logout</button>
            </div>

            <Authors show={page === 'authors'} token={token}/>

            <Books show={page === 'books'}/>

            <NewBook show={page === 'add'}/>

            <Recommend show={page === 'recommend'}/>
        </div>
    )
}

export default App
