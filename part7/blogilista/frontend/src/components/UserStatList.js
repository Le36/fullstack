import {useSelector} from 'react-redux'

const UserStatList = () => {
	const stats = useSelector((state) => state.stats)
	const list = [...stats]

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
								<td>{stat.name}</td>
								<td>{stat.blogs.length}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default UserStatList
