import loginService from '../services/login'
import { showNotification } from './notificationReducer'
import { initBlogs } from './blogReducer'
import { initUsers } from './userReducer'


const initialState = null

export const initAuth = () => {
    return async (dispatch, getState) => {
        const userString = localStorage.getItem('user')
        if (userString) {
            const user = JSON.parse(userString)
            dispatch({
                type: 'LOGIN',
                data: user
            })
            dispatch(initStoreData())
        }
    }
}

export const initStoreData = () => {
    return async (dispatch, getState) => {
        await initUsers()(dispatch, getState)
        await initBlogs()(dispatch, getState)
    }
}


export const authLogout = () => {
    return dispatch => {
        localStorage.clear()
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const authLogin = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password });
            dispatch({
                type: 'LOGIN',
                data: user
            })
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(initStoreData())
        } catch (exception) {
            dispatch(showNotification({
                status: "error",
                content: "Wrong credentials"
            }))
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export default reducer
