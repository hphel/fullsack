import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'


const Blog = ({ blog, owned, onLike, onRemove, initShow }) => {
  const [showDetail, setShowDetail] = useState(initShow)

  return <div className="blog">
    <Row>
      <Col md={11}>
        <Link to={`/blogs/${blog.id}`}><b>{blog.title} by {blog.author}</b> </Link>
      </Col>
      <Col md={1}>
        <Button variant="secondary" onClick={() => setShowDetail(!showDetail)}>{ showDetail ? 'hide' : 'view' }</Button>
      </Col>
    </Row>
      {
        showDetail ?
        <div>
          <p>{blog.url}</p>
          <div> 
            <div><b name="likes">likes {blog.likes}</b> </div>
            <Button name="like" onClick={() => { onLike(blog) }}> like </Button>
          </div>
          <p>{blog.user.username}</p>
          {
            owned ?
            <Button variant="danger" onClick={() => { onRemove(blog) }}>remove</Button>:
            ""
          }
        </div> :
        ""
      }
      
  </div>
}

export default Blog