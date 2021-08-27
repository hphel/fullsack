import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import "./App.css";


const notify = (message, handler, time=5000) => {
    handler(message)
    setTimeout(() => {
        handler(null)
    }, time)
}

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {

    return <form onSubmit={handleLogin}>
        <div>
            username
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
    </form>
}

const BlogForm = ({handleCreateBlog}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setURL] = useState("");

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
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            URL
            <input
                type="text"
                value={url}
                name="URL"
                onChange={({ target }) => setURL(target.value)}
            />
        </div>
        <button type="submit">create</button>
    </form>
}

const Content = ({ blogs, setBlogs, user, logOut, handleCreateBlog, onBlogLike, onBlogRemove }) => {
    useEffect(() => {
        blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const blogFormRef = useRef()

    return <div>
        <h2>blogs</h2>
        <div>
            {user.username} logged in
            <button onClick={logOut}> Log out </button>
        </div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>

        {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} onLike={onBlogLike} onRemove={onBlogRemove} owned={blog.user.username === user.username} />
        ))}
    </div>
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
            setSortedBlogs([...blogs, newBlog])
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
