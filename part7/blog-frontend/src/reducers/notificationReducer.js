const initialState = null

export const showNotification = (message, time=5000) => {
    return dispatch => {
        dispatch({
            type: 'SHOW',
            data: message,
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR',
                data: message,
            })
        }, time)        
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export default reducer
