import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = async (newBlog) => {
	const config = {
		headers: {Authorization: token},
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const update = (newObject) => {
	const properFormat = {
		user: newObject.user.id,
		likes: newObject.likes,
		author: newObject.author,
		title: newObject.title,
		url: newObject.url,
		_id: newObject.id,
		comments: newObject.comments,
	}
	const request = axios.put(`${baseUrl}/${newObject.id}`, properFormat)
	return request.then((response) => response.data)
}

const remove = async (newObject) => {
	const config = {
		headers: {Authorization: token},
	}

	const request = await axios.delete(`${baseUrl}/${newObject.id}`, config)
	return request.data
}

const comment = (blog, comment) => {
	const sendForm = {
		comment: comment,
	}
	const request = axios.post(`${baseUrl}/${blog.id}`, sendForm)
	return request.then((response) => response.data)
}

const blogService = {getAll, create, setToken, update, remove, comment}
export default blogService
