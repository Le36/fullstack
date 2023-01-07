import {useEffect, useRef, useState} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
    const [blogs, setBlogs] = useState([])
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

    const addBlog = async (newBlogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            const returnedBlog = await blogService.create(newBlogObject)
            setBlogs(blogs.concat(returnedBlog))
            setErrorMessage('new blog added successfully!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('failed to add new blog!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addLike = async (updatedBlog) => {
        try {
            const returnedBlog = await blogService.update(updatedBlog)
            setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : returnedBlog))
        } catch (exception) {
            setErrorMessage('failed to like blog!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const removeBlog = async (removable) => {
        try {
            await blogService.remove(removable)
            setBlogs(blogs.filter(blog => blog.id !== removable.id))
            setErrorMessage('successfully removed blog!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('failed to remove blog!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input id='username' type="text" value={username} name="Username"
                    onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password
                <input id='password' type="password" value={password} name="Password"
                    onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button id='login-button' type="submit">login</button>
        </form>
    )

    const blogFormRef = useRef()

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
            <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog}></BlogForm>
            </Togglable>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} receivedBlog={blog} updateLike={addLike} user={user} remove={removeBlog}/>
            )}
        </div>
    )
}

export default App
