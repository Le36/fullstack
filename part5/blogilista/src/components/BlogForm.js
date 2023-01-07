import {useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    const handleBlogChange = (field, {target}) => {
        setNewBlog({...(newBlog), [field]: target.value})
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)

        setNewBlog({title: '', author: '', url: ''})
    }

    return (
        <>
            <h3>create new blog</h3>
            <form onSubmit={addBlog}>
                <p>
                    title:
                    <input
                        value={newBlog.title}
                        onChange={(event) => handleBlogChange('title', event)}
                        placeholder='title here'
                    /></p>
                <p>
                    author:
                    <input
                        value={newBlog.author}
                        onChange={(event) => handleBlogChange('author', event)}
                        placeholder='author here'
                    /></p>
                <p>
                    url:
                    <input
                        value={newBlog.url}
                        onChange={(event) => handleBlogChange('url', event)}
                        placeholder='url here'
                    /></p>
                <button type="submit">save</button>
            </form>
        </>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func
}

export default BlogForm