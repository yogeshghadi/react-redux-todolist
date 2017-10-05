export const getListAll = (todo) => {
  return {
    type: 'SET_TODO',
    payload: todo
  }
}

export const getListActive = (todoActive) => {
  return {
    type: 'SET_TODO_ACTIVE',
    payload: todoActive
  }
}

export const getListCompleted = (todoCompleted) => {
  return {
    type: 'SET_TODO_COMPLETED',
    payload: todoCompleted
  }
}

export const getHashLocation = (hashLocation) => {
  return {
    type: 'SET_TODO_HASH',
    payload: hashLocation
  }
}

export const getInputvalue = ( inputValue ) => {
  return {
    type: 'SET_TODO_INPUT',
    payload: inputValue
  }
}