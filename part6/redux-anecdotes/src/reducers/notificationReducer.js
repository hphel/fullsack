const initialState = '';
export const createNotification = (content) => ({type: 'NOTIFY', data: {content}})
export const clearNotification = (content) => ({type: 'CLEAR'})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data.content
    case 'CLEAR':
      return initialState
    default:
      return state;
  }
}

export default reducer
