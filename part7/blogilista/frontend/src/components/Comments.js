import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addComment} from '../reducers/blogReducer'
import {Button} from '@mui/material'

const Comments = ({blog}) => {
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()
	const list = [...blog.comments]

	const onSubmitComment = (event) => {
		event.preventDefault()
		dispatch(addComment(blog, comment))
		setComment('')
	}

	const handleCommentChange = (e) => setComment(e.target.value)

	return (
		<div>
			<h2>comments</h2>
			<form onSubmit={onSubmitComment}>
				<input value={comment} onChange={(event) => handleCommentChange(event)} />
				<Button variant="outlined" type="submit">
					add comment
				</Button>
			</form>
			<ul>
				{list.map((comment, i) => {
					return <li key={i}>{comment}</li>
				})}
			</ul>
		</div>
	)
}

export default Comments
