import {useState} from 'react'
import PropTypes from 'prop-types'
import {Button} from '@mui/material'

const Togglable = ({children, buttonLabel}) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = {display: visible ? 'none' : ''}
	const showWhenVisible = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button variant="outlined" onClick={toggleVisibility}>
					{buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{children({toggleVisibility: toggleVisibility})}
				<Button variant="outlined" onClick={toggleVisibility}>
					cancel
				</Button>
			</div>
		</div>
	)
}

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
