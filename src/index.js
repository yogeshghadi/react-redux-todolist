import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css'
import App from './containers'

//import registerServiceWorker from './registerServiceWorker'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import { Provider }  from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} >
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'))
//registerServiceWorker();
