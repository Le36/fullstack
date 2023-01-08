import {useEffect, useState} from 'react'
import blogService from './services/blogService'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import {useDispatch} from 'react-redux'
import {setNotification} from './reducers/notificationReducer'
import {initializeBlogs} from './reducers/blogReducer'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

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
				username,
				password,
			})
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(setNotification('wrong credentials', 5))
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={({target}) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={({target}) => setPassword(target.value)}
				/>
			</div>
			<button id="login-button" type="submit">
				login
			</button>
		</form>
	)

	if (user === null) {
		return (
			<div>
				<Notification />
				<h2>Log in to application</h2>
				{loginForm()}
			</div>
		)
	}
	return (
		<div>
			<Notification />
			<h2>blogs</h2>
			<p>
				{user.name} logged in
				<button
					onClick={() => {
						window.localStorage.clear()
					}}
				>
					logout
				</button>
			</p>
			<Togglable buttonLabel={'new blog'}>
				{({toggleVisibility}) => <BlogForm toggleVisibility={toggleVisibility} user={user} />}
			</Togglable>
			<BlogList user={user} />
		</div>
	)
}

export default App
