
import React, { useState } from 'react'
import Blog from './Blog'


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
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={comment}
                name="comment"
                onChange={({ target }) => setComment(target.value)}
            />
            <button>add comment</button>
        </form>
        <ul>
            {
                blog.comments.map(comment => <li>{comment}</li>)
            }
        </ul>
    </div>
}

export default BlogWithComment