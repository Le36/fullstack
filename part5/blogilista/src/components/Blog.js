import {useState} from "react";

const Blog = ({blog}) => {

    const [view, setView] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (view) {
        return (
            <div style={blogStyle}>
                {blog.title} {blog.author}
                <button onClick={() => setView(false)}>hide</button>
                <p> {blog.url} </p>
                <p>Likes: {blog.likes}
                    <button>like</button>
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