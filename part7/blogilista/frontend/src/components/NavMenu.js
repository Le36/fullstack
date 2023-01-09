import {Link} from 'react-router-dom'
import {removeUser} from '../reducers/userReducer'
import {useDispatch} from 'react-redux'

const NavMenu = ({user}) => {
	const dispatch = useDispatch()

	const padding = {
		padding: '14px 16px',
		background: 'lightgrey',
	}

	const logoutButton = () => {
		window.localStorage.clear()
		dispatch(removeUser(user))
	}

	return (
		<div style={padding}>
			<Link style={padding} to="/">
				blogs
			</Link>
			<Link style={padding} to="/users">
				users
			</Link>
			{user.name} logged in
			<button onClick={() => logoutButton()}>logout</button>
		</div>
	)
}

export default NavMenu
