const Reducer = (state, action) => {

  switch (action.type) {
    
    case 'SET_TODO':
      return Object.assign({}, state, {
        todolist: action.payload
      })

    case 'SET_TODO_COMPLETED':
      return Object.assign({}, state, {
        todoCompleted: action.payload
      })

    case 'SET_TODO_ACTIVE':
      return Object.assign({}, state, {
        todoActive: action.payload
      })

    case 'SET_TODO_INPUT':
      return Object.assign({}, state, {
        inputValue: action.payload
      })

    case 'SET_TODO_HASH':
      return Object.assign({}, state, {
        hashLocation : action.payload
      })

    default:
      return state

  }
  
}

export default Reducer;