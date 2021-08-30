import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const initialState = []

export const initBlogs = () => {
    return async (dispatch, getState) => {
        const { authUser } = getState()
        const blogs = await blogService.getAll(authUser.token)
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const addBlog = (blog) => {
    return async (dispatch, getState) => {
        try {
            const { authUser } = getState()
            const response = await blogService.add(authUser.token, blog)
            dispatch({
                type: 'NEW_BLOG',
                data: {
                    ...response.data,
                    user: {
                        username: authUser.username
                    }
                },
            })
            dispatch(
                showNotification({
                    status: "success",
                    content: `a new blog ${blog.title} by ${blog.author} added`
                })
            )
        } catch(e) {
            console.error(e);
            dispatch(
                showNotification({
                    status: "error",
                    content: (e.response.data && e.response.data._message) || 'Failed to create blog'
                })
            )
        }
    }
}

export const updateBlog = (updatedBlog, blog) => {
    return async (dispatch, getState) => {
        try {
            const { authUser } = getState()
            await blogService.update(authUser.token, updatedBlog)
            dispatch({
                type: 'UPDATE_BLOG',
                data: updatedBlog,
            })
            dispatch(
                showNotification({
                    status: "success",
                    content: `${blog.title} by ${blog.author} updated`
                })
            )
        } catch(e) {
            dispatch(
                showNotification({
                    status: "error",
                    content: (e.response.data && e.response.data._message) || 'Failed to update blog'
                })
            )
        }
    }
}

export const removeBlog = (id) => {
    return async (dispatch, getState) => {
        const { authUser } = getState()
        await blogService.remove(authUser.token, id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id,
        })
    }
}

export const addBlogComment = (id, comment) => {
    return async (dispatch, getState) => {
        const { authUser } = getState()
        await blogService.addComment(authUser.token, id, comment)
        dispatch({
            type: 'ADD_BLOG_COMMENT',
            data: {
                id,
                comment
            },
        })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'UPDATE_BLOG':
            return state.map(blog => {
                if (blog.id === action.data.id) {
                    return {
                        ...blog,
                        ...action.data
                    }
                }
                return blog
            })
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        case 'ADD_BLOG_COMMENT':
            return state.map(blog => {
                if (blog.id === action.data.id) {
                    return {
                        ...blog,
                        comments: [...blog.comments, action.data.comment]
                    }
                }
                return blog
            })
        default:
            return state
    }
}

export default reducer
