import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup} from 'react-bootstrap'

const UserBlogList = ({ user }) => {
    return user ? <div>
        <h3>User: {user.username}</h3>
        <h4>Added blogs</h4>
        <ListGroup>
            {
                user.blogs.map(b =>
                    <ListGroup.Item><Link to={`/blogs/${b.id}`}>{b.title}</Link></ListGroup.Item>
                )
            }
        </ListGroup>
    </div> :
    <div> User not found</div>
}

export default UserBlogList