import {Link} from 'react-router-dom'
import {removeUser} from '../reducers/userReducer'
import {useDispatch} from 'react-redux'
import {Button} from '@mui/material'

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
			<Button variant="outlined" onClick={() => logoutButton()}>
				logout
			</Button>
		</div>
	)
}

export default NavMenu
