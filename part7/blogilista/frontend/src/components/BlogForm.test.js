import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm calls parent with inputted data', async () => {
	const createBlog = jest.fn()

	render(<BlogForm createBlog={createBlog} />)

	const titleInput = screen.getByPlaceholderText('title here')
	const authorInput = screen.getByPlaceholderText('author here')
	const urlInput = screen.getByPlaceholderText('url here')
	const sendButton = screen.getByText('save')

	await userEvent.type(titleInput, 'testing a title-input form..')
	await userEvent.type(authorInput, 'testing a author-input form..')
	await userEvent.type(urlInput, 'testing a url-input form..')
	await userEvent.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0]).toStrictEqual({
		author: 'testing a author-input form..',
		title: 'testing a title-input form..',
		url: 'testing a url-input form..',
	})
})
