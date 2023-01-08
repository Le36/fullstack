import {useEffect, useState} from 'react'
import blogService from '../services/blogService'
import {useDispatch} from 'react-redux'
import {setUser} from '../reducers/userReducer'
import loginService from '../services/loginService'
import {setNotification} from '../reducers/notificationReducer'

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
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
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(setNotification('wrong credentials', 5))
		}
	}

	return (
		<div>
			<h2>Log in to application</h2>
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
		</div>
	)
}

export default LoginForm
