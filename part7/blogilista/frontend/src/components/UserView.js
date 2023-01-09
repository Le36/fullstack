import {useSelector} from 'react-redux'

const UserView = ({id}) => {
	const stats = useSelector((state) => state.stats)
	if (!stats) {
		return null
	}
	const user = stats.find((s) => s.id === id)
	if (!user) {
		return <>invalid id</>
	}

	return (
		<div>
			<h2>added blogs</h2>
			<ul>
				{user.blogs.map((u) => {
					return <li key={u.id}>{u.title}</li>
				})}
			</ul>
		</div>
	)
}

export default UserView
