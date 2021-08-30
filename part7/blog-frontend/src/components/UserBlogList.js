import React from 'react'
import { Link } from 'react-router-dom'

const UserBlogList = ({ user }) => {
    return user ? <div>
        <h3>{user.username}</h3>
        <h4>Added blogs</h4>
        <ul>
            {
                user.blogs.map(b => <li>
                    <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                </li>)
            }
        </ul>
    </div> :
    <div> User not found</div>
}

export default UserBlogList