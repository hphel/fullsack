import React, { useEffect } from "react"
import Blog from "./Blog"
import BlogForm from './BlogForm'
import Togglable from "./Togglable"

import blogService from "../services/blogs"


const Content = ({ blogs, setBlogs, user, logOut, handleCreateBlog, onBlogLike, onBlogRemove }) => {
    useEffect(() => {
        blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const blogFormRef = useRef()

    return <div>
        <h2>blogs</h2>
        <div>
            {user.username} logged in
            <button onClick={logOut}> Log out </button>
        </div>
        <Togglable buttonLabel="create new blog">
            <BlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>

        {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} onLike={onBlogLike} onRemove={onBlogRemove} owned={blog.user.username === user.username} />
        ))}
    </div>
}
export default Content
