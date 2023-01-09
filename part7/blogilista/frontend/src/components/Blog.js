import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {likeBlog, removeBlog} from '../reducers/blogReducer'
import {Link} from 'react-router-dom'

const Blog = ({receivedBlog, singleView}) => {
	const dispatcher = useDispatch()
	const user = useSelector((state) => state.user)
	const [view, setView] = useState(false)
	const [blog, setBlog] = useState(receivedBlog)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const addLike = (event) => {
		event.preventDefault()
		const updatedLikeBlog = {...blog, likes: blog.likes + 1}

		dispatcher(likeBlog(updatedLikeBlog))
		setBlog(updatedLikeBlog)
	}

	const deleteBlog = (event) => {
		event.preventDefault()
		if (window.confirm('are you sure u want to delete this blog?')) {
			dispatcher(removeBlog(blog))
		}
	}

	const padding = {
		padding: 5,
	}

	if (singleView) {
		return (
			<div style={blogStyle}>
				<h3>
					{blog.title} {blog.author}
				</h3>
				<p>
					<a href={blog.url}>{blog.url}</a>
				</p>
				<p>
					Likes: {blog.likes}
					<button onClick={addLike}>like</button>
				</p>
				<p>{blog.user.username}</p>
			</div>
		)
	}

	const ownedBlog = () => {
		return (
			<div style={blogStyle}>
				{blog.title} {blog.author}
				<button onClick={() => setView(false)}>hide</button>
				<p> {blog.url} </p>
				<p>
					Likes: {blog.likes}
					<button onClick={addLike}>like</button>
				</p>
				<p>{blog.user.username}</p>
				<p>
					<button onClick={deleteBlog}>delete</button>
				</p>
			</div>
		)
	}

	const notOwnedBlog = () => {
		return (
			<div style={blogStyle}>
				{blog.title} {blog.author}
				<button onClick={() => setView(false)}>hide</button>
				<p> {blog.url} </p>
				<p>
					Likes: {blog.likes}
					<button onClick={addLike}>like</button>
				</p>
				<p>{blog.user.username}</p>
			</div>
		)
	}

	const smallView = () => {
		return (
			<div style={blogStyle}>
				<Link style={padding} to={`/blogs/${blog.id}`}>
					{blog.title} {blog.author}
				</Link>
				<button onClick={() => setView(true)}>view</button>
			</div>
		)
	}

	if (view) {
		if (user.username === blog.user.username || user.id === blog.user.id) {
			return ownedBlog()
		}
		return notOwnedBlog()
	}

	return smallView()
}

export default Blog
