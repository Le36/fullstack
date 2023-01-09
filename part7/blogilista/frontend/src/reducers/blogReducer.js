import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import {setNotification} from './notificationReducer'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
		},
		addLike(state, action) {
			const updatedBlog = action.payload
			const idOfUpdated = action.payload.id
			return state.map((a) => (a.id !== idOfUpdated ? a : updatedBlog))
		},
		setBlogs(state, action) {
			return action.payload
		},
		removeOne(state, action) {
			return state.filter((blog) => blog.id !== action.payload.id)
		},
		newComment(state, action) {
			const updatedBlog = action.payload
			const idOfUpdated = action.payload.id
			return state.map((a) => (a.id !== idOfUpdated ? a : updatedBlog))
		},
	},
})

export const {addLike, setBlogs, appendBlog, removeOne, newComment} = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (content) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(content)
			dispatch(appendBlog(newBlog))
			dispatch(setNotification('new blog added successfully!', 5))
		} catch (exception) {
			dispatch(setNotification('failed to add blog!', 5))
		}
	}
}

export const likeBlog = (blog) => {
	return async (dispatch) => {
		const likedBlog = await blogService.update(blog)
		dispatch(addLike(likedBlog))
	}
}

export const addComment = (blog, comment) => {
	return async (dispatch) => {
		try {
			const res = await blogService.comment(blog, comment)
			dispatch(newComment(res))
			dispatch(setNotification('successfully sent comment!', 5))
		} catch (exception) {
			dispatch(setNotification('failed to add comment!', 5))
		}
	}
}

export const removeBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogService.remove(blog)
			dispatch(removeOne(blog))
			dispatch(setNotification('successfully removed blog!', 5))
		} catch (exception) {
			dispatch(setNotification('failed to remove blog!', 5))
		}
	}
}

export default blogSlice.reducer
