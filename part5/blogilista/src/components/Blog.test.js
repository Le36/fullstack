import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Blog from './Blog'


test('show only author and title, no url', () => {
    const blog = {
        author: 'authorPart',
        title: 'titlePart',
        url: 'urlPart',
    }

    render(<Blog receivedBlog={blog}/>)

    screen.getByText('titlePart', {exact: false})
    screen.getByText('authorPart', {exact: false})

    const element = screen.queryByText('urlPart', {exact: false})
    expect(element).toBeNull()
})