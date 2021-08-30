import React from "react"
import Blog from "./Blog"
import BlogForm from './BlogForm'
import Togglable from "./Togglable"

const GeneralBlogList = ({ blogs, authUser, handleCreateBlog, onBlogLike, onBlogRemove }) => {
    return <div>
        <Togglable buttonLabel="create new blog">
            <BlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>

        {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} onLike={onBlogLike} onRemove={onBlogRemove} owned={blog.user.username === authUser.username} initShow={false} />
        ))}
    </div>
}
export default GeneralBlogList
