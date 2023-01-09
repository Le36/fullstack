const Comments = ({blog}) => {
	const list = [...blog.comments]

	return (
		<div>
			<ul>
				{list.map((comment, i) => {
					return <li key={i}>{comment}</li>
				})}
			</ul>
		</div>
	)
}

export default Comments
