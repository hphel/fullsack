import userService from '../services/users'

const initialState = []

export const initUsers = () => {
    return async (dispatch, getState) => {
        const { authUser } = getState()
        const users = await userService.getAll(authUser.token)
        dispatch({
            type: 'INIT_USER',
            data: users,
        })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return action.data
        default:
            return state
    }
}

export default reducer
