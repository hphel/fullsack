
import React, { useState } from 'react'
import Blog from './Blog'
import { Form, ListGroup, Button } from 'react-bootstrap'

const BlogWithComment = ({ blog, owned, onLike, onRemove, onCommentSubmit }) => {
    const [comment, setComment] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        onCommentSubmit(blog.id, comment)
    }

    return <div>
        <Blog blog={blog}
            initShow={true}
            owned={owned}
            onLike={onLike}
            onRemove={onRemove} />
        <h4>Comments</h4>
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control type="text" placeholder="Enter comment" onChange={({ target }) => setComment(target.value)}/>
            </Form.Group>
            <Button type="submit" variant="info">Add comment</Button>
        </Form>
        <ListGroup variant="flush">
            {
                blog.comments.map(comment => <ListGroup.Item>{comment}</ListGroup.Item>)
            }
        </ListGroup>
    </div>
}

export default BlogWithComment