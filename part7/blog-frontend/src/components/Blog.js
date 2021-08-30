import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog, owned, onLike, onRemove, initShow }) => {
  const [showDetail, setShowDetail] = useState(initShow)

  return <div className="blog">

    <Link to={`/blogs/${blog.id}`}><b>{blog.title} by {blog.author}</b> </Link>
    <button name="view" onClick={() => setShowDetail(!showDetail)}> { showDetail ? 'hide' : 'view' } </button>
      {
        showDetail ?
        <div>
          <p>{blog.url}</p>
          <div> 
            <b name="likes">likes {blog.likes}</b> 
            <button name="like" onClick={() => { onLike(blog) }}> like </button>
          </div>
          <p>{blog.user.username}</p>
          {
            owned ?
            <button onClick={() => { onRemove(blog) }}>remove</button>:
            ""
          }
        </div> :
        ""
      }
      
  </div>
}

export default Blog