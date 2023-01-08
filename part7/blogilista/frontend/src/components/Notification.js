import {useSelector} from 'react-redux'
import './Notification.css'

const Notification = () => {
	const notification = useSelector((state) => state.notification)

	if (notification) {
		return (
			<div className="container">
				<div className="message-orange">
					<p className="message-content">{notification}</p>
					<div className="message-timestamp-right">
						SMS {new Date().getHours()}:{new Date().getMinutes()}
					</div>
				</div>
			</div>
		)
	}
	return <div className="container" />
}

export default Notification
