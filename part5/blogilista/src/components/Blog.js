import {useState} from "react";

const Blog = ({receivedBlog, updateLike}) => {

    const [view, setView] = useState(false)
    const [blog, setBlog] = useState(receivedBlog)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const addLike = (event) => {
        event.preventDefault()
        const updatedLikeBlog = {...blog, likes: blog.likes + 1}

        updateLike(updatedLikeBlog)
        setBlog(updatedLikeBlog)
    }

    if (view) {
        return (
            <div style={blogStyle}>
                {blog.title} {blog.author}
                <button onClick={() => setView(false)}>hide</button>
                <p> {blog.url} </p>
                <p>Likes: {blog.likes}
                    <button onClick={addLike}>like</button>
                </p>
                <p>{(blog.user.username)}</p>
            </div>
        )
    }
    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={() => setView(true)}>view</button>
        </div>
    )
}

export default Blog