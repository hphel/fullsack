import React, { useState } from 'react'


const Blog = ({ blog, owned, onLike, onRemove }) => {
  const [showDetail, setShowDetail] = useState(false)

  return <div className="blog">
    <b>{blog.title} by {blog.author}</b> 
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