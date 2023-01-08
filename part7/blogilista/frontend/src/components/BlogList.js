import Blog from './Blog'
import {useSelector} from 'react-redux'

const BlogList = ({user}) => {
	const blogs = useSelector((state) => state.blogs)
	const list = [...blogs]

	return (
		<div>
			{list
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog key={blog.id} receivedBlog={blog} user={user} remove={null} />
				))}
		</div>
	)
}

export default BlogList