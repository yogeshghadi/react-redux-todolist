// importing react library
import React, { Component } from 'react';

// importing styles
import '../styles/index.css';

// importing components
import TodoInput from '../components/TodoInput';
import Checkbox from '../components/Checkbox';
import Footer from '../components/Footer';

import { withRouter } from 'react-router-dom';

// importing uniqid
import uniqid from 'uniqid/index.js';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todolist: [],
      todoCompleted: [],
      todoActive: [],
      inputValue: "",
      hashLocation: ""
    };

    this.getValue = this.getValue.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.getStatus = this.getStatus.bind(this);

  } // constructor

  componentWillMount() {

    this.props.history.listen((location, action) => {
      
      let hash = this.state.hashLocation;

      if(hash !== location.hash) {

        hash = location.hash;

        this.setState({
          hashLocation : hash
        }, 
        function(){
          this.getList();
        });

      }
      else {
        return;
      }

    });

  } // componentWillMount

  componentDidMount() {
    this.getList();
  } // componentDidMount

  getList() {

    if(!localStorage.getItem("todolist")) {
      localStorage.setItem("todolist", JSON.stringify(this.state.todolist) );
    }
    else {
      this.setState({
        todolist: JSON.parse(localStorage.getItem("todolist"))
      },
      function() {
        this.getListActive();
        this.getListCompleted();
      });
    }

  } // getList

  getListActive() {

    let updatedList = this.state.todolist.filter(function(item, index){
      return item.completed === false
    });

    this.setState({
      todoActive: updatedList
    });

  } // getListActive

  getListCompleted() {

    let updatedList = this.state.todolist.filter(function(item, index){
      return item.completed === true
    });

    this.setState({
      todoCompleted: updatedList
    });

  } // getListCompleted

  // update state with changed input value

  getValue(e) {

    e.preventDefault();

    this.setState({
      inputValue: e.target.value
    })

  } // getValue

  // todolist localstorage modifications

  addItem(e) {
    
    if(!this.state.inputValue) {
      return;
    }
    else{

      if(e.target.type === "text" && (e.which ? e.which : e.keyCode) !== 13){
        return;
      }

      let todoItem = {
        key: uniqid('todo-'),
        id: uniqid(),
        label: this.state.inputValue,
        completed: false
      }

      let updatedList = this.state.todolist;
      updatedList.push(todoItem);

      this.setState({
        todolist: updatedList,
        inputValue: ""
      },
      function(){
        localStorage.setItem( "todolist", JSON.stringify(this.state.todolist) );
        window.location.hash = '';
        
        this.getListActive();
        this.getListCompleted();
      });

    }

  } // addItem

  removeItem(id) {
    
    let updatedList = this.state.todolist.filter(function(item, index){
      return item.id !== id;
    });

    this.setState({
      todolist: updatedList
    },
    function(){
      localStorage.setItem("todolist", JSON.stringify(this.state.todolist) );

      this.getListActive();
      this.getListCompleted();      
    });
    
  } // removeItem

  getStatus(e, id) {

    let updatedList = this.state.todolist.map( (item) => {

      if(item.id === id) {
        if(e.target.checked){
          item.completed = true;
        }
        else{
          item.completed = false;
        }
      }

      return item;

    });

    this.setState({
      todolist: updatedList
    },
    function(){
      localStorage.setItem("todolist", JSON.stringify(this.state.todolist) );

      this.getListActive();
      this.getListCompleted();
    });

  } // getStatus

  checkLocation() {

    let list;
    let nowShowing = 'all';

    if( this.state.hashLocation === '#active' ) {
      list = this.state.todoActive;
      nowShowing = 'active';
    }
    else if ( this.state.hashLocation === '#completed' ) {
      list = this.state.todoCompleted;
      nowShowing = 'completed';
    }
    else {
      list = this.state.todolist;
      nowShowing = 'all';
    }

    return [list, nowShowing];

  } // checkLocation

  render() {

    let list, listItems, nowShowing;

    [list, nowShowing] = this.checkLocation();

    listItems = list.map( (item) => 
      <Checkbox key={item.key} id={item.id} label={item.label} checked={item.completed} removeItem={this.removeItem} getStatus={this.getStatus} />
    );

    return (
      
      <div className="app">

        <div className="header">
          <h2>To Do List</h2>
        </div>

        <div className="row todo-wrapper">
          
          <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
            
            <TodoInput inputValue={this.state.inputValue} placeholder="To do Task" btnLabel="Add" getValueHandler={this.getValue} addItemHandler={this.addItem} />

            <div className="row todo-list">
              <ul className="col-xs-12">
                {listItems}
              </ul>
            </div>

            <Footer activeNumber={this.state.todoActive.length} nowShowing={nowShowing}/>
            
          </div>

        </div>

      </div>
      
    );
  } // render

}

export default withRouter(App);
