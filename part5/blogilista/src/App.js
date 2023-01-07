import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addBlog = (event) => {
        event.preventDefault()
        blogService
            .create(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog({title: '', author: '', url: ''})
            })
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input type="text" value={username} name="Username"
                       onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password
                <input type="password" value={password} name="Password"
                       onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type="submit">login</button>
        </form>
    )


    const handleTitleChange = ({target}) => {
        const prevData = newBlog
        setNewBlog({title: target.value, author: prevData.author, url: prevData.url})
    }
    const handleAuthorChange = ({target}) => {
        const prevData = newBlog
        setNewBlog({title: prevData.title, author: target.value, url: prevData.url})
    }
    const handleUrlChange = ({target}) => {
        const prevData = newBlog
        setNewBlog({title: prevData.title, author: prevData.author, url: target.value})
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <p>
                title:
                <input
                    value={newBlog.title}
                    onChange={handleTitleChange}
                /></p>
            <p>
                author:
                <input
                    value={newBlog.author}
                    onChange={handleAuthorChange}
                /></p>
            <p>
                url:
                <input
                    value={newBlog.url}
                    onChange={handleUrlChange}
                /></p>
            <button type="submit">save</button>
        </form>
    )


    if (user === null) {
        return (
            <div>
                {errorMessage}
                <h2>Log in to application</h2>
                {loginForm()}
            </div>
        )
    }
    return (
        <div>
            {errorMessage}
            <h2>blogs</h2>
            <p>{user.name} logged in
                <button onClick={() => {
                    window.localStorage.clear()
                }
                }>logout
                </button>
            </p>
            {blogForm()}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    )

}

export default App
