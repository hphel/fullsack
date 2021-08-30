import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import GeneralBlogList from "./components/GeneralBlogList";
import UserList from "./components/UserList";
import UserBlogList from "./components/UserBlogList";
import BlogWithComment from "./components/BlogWithComment";
import Notification from "./components/Notification";
import Menu from "./components/Menu";

import { useDispatch, useSelector } from "react-redux";
import { addBlog, updateBlog, removeBlog, addBlogComment } from './reducers/blogReducer';
import { initAuth, authLogin, authLogout } from './reducers/authReducer';
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import "./App.css";


const NotFound = () => <div>Nothing found</div>

const App = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const authUser = useSelector(({ authUser }) => authUser)
    const message = useSelector(({ notification }) => notification)
    const users = useSelector(({ users }) => users)
    const blogs = useSelector(({ blogs }) => blogs)

    const matchRouteUser = useRouteMatch('/users/:id')
    const matchRouteUserId = matchRouteUser ? matchRouteUser.params.id : null
    const routeUser = users.find(u => u.id === matchRouteUserId)

    const matchRouteBlog = useRouteMatch('/blogs/:id')
    const matchRouteBlogId = matchRouteBlog ? matchRouteBlog.params.id : null
    const routeBlog = blogs.find(b => b.id === matchRouteBlogId)

    useEffect(() => {
        dispatch(initAuth())
    }, [dispatch])

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(authLogin(username, password))
    };

    const logOut = () => {
        dispatch(authLogout())
    }
    const handleCreateBlog = (blog) => {
        dispatch(addBlog(blog))
    }

    const onBlogLike = (blog) => {
        dispatch(updateBlog({
            id: blog.id,
            likes: blog.likes + 1
        }, blog))
    }

    const onBlogRemove = (toRemoveBlog) => {
        if (window.confirm(`You are gonna remove ${toRemoveBlog.title} by ${toRemoveBlog.author}`)) {
            dispatch(removeBlog(toRemoveBlog.id))
        }
    }

    const onCommentSubmit = (blogId, comment) => {
        dispatch(addBlogComment(blogId, comment))
    }

    return <div>
        <Notification message={message} />
        {authUser ?
            <div>
                <Menu authUser={authUser} logOut={logOut}/>
                <h2>blogs</h2> 
                
                <Switch>
                    <Route path='/users/:id'>
                        <UserBlogList user={routeUser} />
                    </Route>
                    <Route path='/users'>
                        <UserList users={users} />
                    </Route>
                    <Route path='/blogs/:id'>
                        {
                            routeBlog ? 
                            <BlogWithComment blog={routeBlog} 
                                owned={routeBlog.user.username === authUser.username}
                                onCommentSubmit={onCommentSubmit}
                                onLike={onBlogLike}
                                onRemove={onBlogRemove}/> :
                           <NotFound/>
                        }
                        
                    </Route>
                    <Route path='/'>
                        <GeneralBlogList
                            authUser={authUser}
                            blogs={blogs}
                            handleCreateBlog={handleCreateBlog}
                            onBlogLike={onBlogLike}
                            onBlogRemove={onBlogRemove}
                        />
                    </Route>
                </Switch></div> :
            <LoginForm
                handleLogin={handleLogin}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
            />
        }
    </div>
};

export default App;
