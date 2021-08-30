import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'


import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    authUser: authReducer,
    blogs: blogReducer,
    users: userReducer,
    notification: notificationReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
