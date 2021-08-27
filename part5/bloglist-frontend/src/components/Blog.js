import React from 'react'
import Togglable from "./Togglable";


const Blog = ({ blog, owned, onLike, onRemove }) => (
  <div className="blog">
    <b>{blog.title}</b> 
    <Togglable buttonLabel="view" cancelLabel="hide">
      <div>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <div>likes {blog.likes} <button onClick={() => { onLike(blog) }}> like </button></div>
        <p>{blog.user.username}</p>
        {
          owned ?
          <button onClick={() => { onRemove(blog) }}>remove</button>:
          ""
        }
      </div>
    </Togglable>
  </div>
)

export default Blog