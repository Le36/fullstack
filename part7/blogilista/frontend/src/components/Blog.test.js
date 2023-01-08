import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('show only author and title, no url', () => {
	const blog = {
		author: 'authorPart',
		title: 'titlePart',
		url: 'urlPart',
	}

	render(<Blog receivedBlog={blog} />)

	screen.getByText('titlePart', {exact: false})
	screen.getByText('authorPart', {exact: false})

	const urlQuery = screen.queryByText('urlPart', {exact: false})
	expect(urlQuery).toBeNull()
	const likesQuery = screen.queryByText('likes', {exact: false})
	expect(likesQuery).toBeNull()
})

test('show all when view is pressed', async () => {
	const blog = {
		author: 'authorPart',
		title: 'titlePart',
		url: 'urlPart',
		user: {
			username: 'namePart',
		},
	}

	const mockHandler = jest.fn()

	render(<Blog receivedBlog={blog} updateLike={mockHandler} user={mockHandler} remove={mockHandler} />)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	screen.getByText('titlePart', {exact: false})
	screen.getByText('authorPart', {exact: false})
	screen.getByText('urlPart', {exact: false})
	screen.getByText('namePart', {exact: false})
	screen.getByText('likes', {exact: false})
})

test('if like is pressed twice, addLike is called twice', async () => {
	const blog = {
		author: 'authorPart',
		title: 'titlePart',
		url: 'urlPart',
		user: {
			username: 'namePart',
		},
	}
	const mockHandler = jest.fn()
	const likeMockHandler = jest.fn()

	render(<Blog receivedBlog={blog} updateLike={likeMockHandler} user={mockHandler} remove={mockHandler} />)

	const user = userEvent.setup()
	const viewButton = screen.getByText('view')
	await user.click(viewButton)

	const likeButton = screen.getByText('like')
	await user.dblClick(likeButton)
	expect(likeMockHandler.mock.calls).toHaveLength(2)
})
