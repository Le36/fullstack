import {useSelector} from "react-redux";
import Blog from "./Blog";

const BlogView = ({id}) => {

    const blogs = useSelector((state) => state.blogs)
    if (!blogs) return null
    console.log(blogs)
    const list = [...blogs]

    const blog = list.find((s) => s.id === id)
    if (!blog) {
        return <>invalid id</>
    }

    return (
        <div>
            <h2>blog: {blog.title}</h2>
            <Blog receivedBlog={blog} singleView={true}/>

        </div>
    )
}

export default BlogView