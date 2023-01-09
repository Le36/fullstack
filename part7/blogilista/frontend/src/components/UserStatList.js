import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {initializeStats} from '../reducers/statsReducer'

const UserStatList = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeStats())
	}, [])

	const stats = useSelector((state) => state.stats)
	const list = [...stats]
	const padding = {
		padding: 5,
	}
	return (
		<div>
			<h2>users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{list
						.sort((a, b) => b.blogs.length - a.blogs.length)
						.map((stat) => (
							<tr key={stat.id}>
								<td>
									<Link style={padding} to={`/users/${stat.id}`}>
										{stat.name}
									</Link>
								</td>
								<td>{stat.blogs.length}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default UserStatList
