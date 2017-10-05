import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import Reducer from './reducers'

const initialState = {
  todolist: [],
  todoCompleted: [],
  todoActive: [],
  inputValue: "",
  hashLocation: ""
}

const store = createStore(
    Reducer,
    initialState,
    compose(
      applyMiddleware( createLogger(), thunk ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

export default store