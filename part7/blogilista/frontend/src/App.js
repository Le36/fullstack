import {useEffect} from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import Notification from './components/Notification'
import {useDispatch, useSelector} from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import {removeUser} from './reducers/userReducer'
import UserStatList from './components/UserStatList'
import {initializeStats} from './reducers/statsReducer'
import {Route, Routes, useMatch} from 'react-router-dom'
import UserView from './components/UserView'
import BlogView from "./components/BlogView";

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const userMatch = useMatch('/users/:id')
	const blogMatch = useMatch('/blogs/:id')

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeStats())
	}, [dispatch])

	const logoutButton = () => {
		window.localStorage.clear()
		dispatch(removeUser(user))
	}

	if (!user) {
		return (
			<div>
				<Notification />
				<LoginForm />
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			<p>
				{user.name} logged in
				<button onClick={() => logoutButton()}>logout</button>
			</p>
			<Routes>
				<Route path="/blogs/:id" element={<BlogView id={blogMatch ? blogMatch.params.id : null} />} />
				<Route path="/users/:id" element={<UserView id={userMatch ? userMatch.params.id : null} />} />
				<Route path="/users" element={<UserStatList />} />
				<Route
					path=""
					element={
						<>
							<Togglable buttonLabel={'new blog'}>
								{({toggleVisibility}) => <BlogForm toggleVisibility={toggleVisibility} />}
							</Togglable>
							<BlogList />
						</>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
