import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Content from "./components/Content";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

import "./App.css";


const notify = (message, handler, time=5000) => {
    handler(message)
    setTimeout(() => {
        handler(null)
    }, time)
}

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user')
        if (userString) {
            const user = JSON.parse(userString)
            setUser(user)
        }
    }, [])

    const setSortedBlogs = (blogs) => {
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            setUsername("")
            setPassword("")
            localStorage.setItem('user', JSON.stringify(user));
        } catch (exception) {
            notify({
                status: "error",
                content: "Wrong credentials"
            }, setMessage)
        }
    };

    const logOut = () => {
        setUser(null)
        localStorage.clear()
    }
    const handleCreateBlog = async (blog) => {
        try {
            const response = await blogService.add(user.token, blog)
            const newBlog = response.data
            setSortedBlogs([...blogs, {
                ...newBlog,
                user: {
                    username: user.username
                }
            }])
            notify({
                status: "success",
                content: `a new blog ${blog.title} by ${blog.author} added`
            }, setMessage)
        } catch(e) {
            console.error(e);
            notify({
                status: "error",
                content: (e.response.data && e.response.data._message) || 'Failed to create blog'
            }, setMessage)
        }
    }

    const onBlogLike = async (blog) => {
        try {
            const modifiedBlog = { ...blog, likes: blog.likes + 1 }
            await blogService.update(user.token, {
                id: blog.id,
                likes: blog.likes + 1
            })
            const newBlogs = blogs.map(b => {
                if (b.id === modifiedBlog.id) {
                    return modifiedBlog
                }
                return b
            })
            setSortedBlogs(newBlogs)
            notify({
                status: "success",
                content: `${blog.title} by ${blog.author} liked`
            }, setMessage)
        } catch(e) {
            notify({
                status: "error",
                content: (e.response.data && e.response.data._message) || 'Failed to like blog'
            }, setMessage)
        }
    }

    const onBlogRemove = async (toRemoveBlog) => {
        try {
            if (window.confirm(`You are gonna remove ${toRemoveBlog.title} by ${toRemoveBlog.author}`)) {
                await blogService.remove(user.token, toRemoveBlog.id)
                const newBlogs = blogs.filter(b => b.id !== toRemoveBlog.id)
                setSortedBlogs(newBlogs)
                notify({
                    status: "success",
                    content: `${toRemoveBlog.title} by ${toRemoveBlog.author} removed`
                }, setMessage)
            }
        } catch(e) {
            console.error(e);
            notify({
                status: "error",
                content: (e.response.data && e.response.data._message) || 'Failed to remove blog'
            }, setMessage)
        }
    }

    return <div>
        <Notification message={message} />
        {user ?
            <Content
                blogs={blogs}
                setBlogs={setSortedBlogs}
                user={user}
                logOut={logOut}
                handleCreateBlog={handleCreateBlog}
                onBlogLike={onBlogLike}
                onBlogRemove={onBlogRemove}
            /> :
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
