import {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {Button} from '@mui/material'

const BlogForm = ({toggleVisibility}) => {
	const dispatch = useDispatch()
	const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

	const handleBlogChange = (field, {target}) => {
		setNewBlog({...newBlog, [field]: target.value})
	}

	const addBlog = (event) => {
		event.preventDefault()
		dispatch(createBlog(newBlog))
		setNewBlog({title: '', author: '', url: ''})
		toggleVisibility()
	}

	return (
		<>
			<h3>create new blog</h3>
			<form onSubmit={addBlog}>
				<p>
					title:
					<input
						id="titleInput"
						value={newBlog.title}
						onChange={(event) => handleBlogChange('title', event)}
						placeholder="title here"
					/>
				</p>
				<p>
					author:
					<input
						id="authorInput"
						value={newBlog.author}
						onChange={(event) => handleBlogChange('author', event)}
						placeholder="author here"
					/>
				</p>
				<p>
					url:
					<input
						id="urlInput"
						value={newBlog.url}
						onChange={(event) => handleBlogChange('url', event)}
						placeholder="url here"
					/>
				</p>
				<Button variant="outlined" type="submit">
					save
				</Button>
			</form>
		</>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func,
}

export default BlogForm
