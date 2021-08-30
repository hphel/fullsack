import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

const BlogForm = ({ handleCreateBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setURL] = useState("")

    const createBlog = (e) => {
        e.preventDefault()
        handleCreateBlog({
            title,
            author,
            url
        })
    }

    return <Form onSubmit={createBlog}>
        <h3>Create new</h3>
        <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={({ target }) => setTitle(target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter author" onChange={({ target }) => setAuthor(target.value)}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control type="text" placeholder="Enter URL" onChange={({ target }) => setURL(target.value)}/>
        </Form.Group>
        <Button name="create" type="submit">create</Button>
    </Form>
}

export default BlogForm
