const initialState = ''

export const setFilter = (filter) => ({type: 'SET_FILTER', data: { filter }})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.filter
    default:
      return state
  }
}

export default reducer
