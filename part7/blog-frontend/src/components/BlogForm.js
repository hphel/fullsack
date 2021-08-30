import React, { useState } from "react"


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

    return <form onSubmit={createBlog}>
        <h3>Create new</h3>
        <div>
            Title
            <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            Author
            <input
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            URL
            <input
                type="text"
                value={url}
                name="url"
                onChange={({ target }) => setURL(target.value)}
            />
        </div>
        <button name="create" type="submit">create</button>
    </form>
}

export default BlogForm
