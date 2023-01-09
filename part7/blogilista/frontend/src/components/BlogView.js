import {useSelector} from 'react-redux'
import Blog from './Blog'
import Comments from './Comments'

const BlogView = ({id}) => {
	const blogs = useSelector((state) => state.blogs)
	if (!blogs) return null
	const list = [...blogs]

	const blog = list.find((s) => s.id === id)
	if (!blog) {
		return <>invalid id</>
	}

	return (
		<div>
			<h2>blog: {blog.title}</h2>
			<Blog receivedBlog={blog} singleView={true} />
			<Comments blog={blog} />
		</div>
	)
}

export default BlogView
