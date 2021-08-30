import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {

    return <div>
        <h3>Users</h3>
        <table>
        <tr>
            <th></th>
            <th>blogs created</th>
        </tr>
            {
                users.map(u => <tr>
                    <td><Link to={`/users/${u.id}`}>{u.username} </Link></td>
                    <td>{u.blogs.length}</td>
                </tr>)
            }
        </table>
    </div>
}

export default UserList