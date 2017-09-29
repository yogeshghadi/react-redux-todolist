import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css';
import App from './containers';
//import registerServiceWorker from './registerServiceWorker';
//import { BrowserRouter, Route, Link } from 'react-router-dom';

import {BrowserRouter as Router, Route} from 'react-router-dom';


const onChangeHandler = () => {
  console.log('path changed');
}

ReactDOM.render(
    <Router>
      <Route path="/" component={App} onChange={onChangeHandler} >
      </Route>
    </Router>
  , document.getElementById('root'));
//registerServiceWorker();
