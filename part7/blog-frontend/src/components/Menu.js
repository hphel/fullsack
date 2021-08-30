import { Link } from 'react-router-dom';

const Menu = ({ authUser, logOut }) => {

    return <div>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        <div>
            {authUser.username} logged in
            <button onClick={logOut}> Log out </button>
        </div>
    </div>
}

export default Menu