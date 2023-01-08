import {useEffect} from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import Notification from './components/Notification'
import {useDispatch, useSelector} from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import {removeUser} from './reducers/userReducer'
import UserStatList from "./components/UserStatList";
import {initializeStats} from "./reducers/statsReducer";

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeStats())
	}, [dispatch])


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
			<UserStatList/>
			<Notification />
			<h2>blogs</h2>
			<p>
				{user.name} logged in
				<button
					onClick={() => {
						window.localStorage.clear()
						dispatch(removeUser(user))
					}}
				>
					logout
				</button>
			</p>
			<Togglable buttonLabel={'new blog'}>
				{({toggleVisibility}) => <BlogForm toggleVisibility={toggleVisibility} />}
			</Togglable>
			<BlogList />
		</div>
	)
}

export default App
