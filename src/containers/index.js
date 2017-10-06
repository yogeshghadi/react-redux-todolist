// importing react library
import React, { Component } from 'react'

// importing styles
import '../styles/index.css'

// importing components
import TodoInput from '../components/TodoInput'
import Checkbox from '../components/Checkbox'
import Footer from '../components/Footer'

// importing router
import { withRouter } from 'react-router-dom'

// importing uniqid
import uniqid from 'uniqid/index.js'

// redux imports
import { connect } from 'react-redux'
import { 
  getListAll,
  getListActive,
  getListCompleted,
  getHashLocation,
  getInputvalue
} from '../actions/getListAction'

class App extends Component {

  constructor(props) {
    super(props)

    this.getValue = this.getValue.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.getStatus = this.getStatus.bind(this)

  } // constructor

  componentWillMount() {

    this.getHashLocation()

  } // componentWillMount

  getHashLocation() {

    this.props.history.listen((location, action) => {

      const { getHashLocationDispatch, hashLocation } = this.props

      if (hashLocation !== location.hash) {
        getHashLocationDispatch(location.hash)
        this.getList()
      }
      else {
        return
      }

    })

  } // getHashLocation

  componentDidMount() {
    this.getList()
  } // componentDidMount

  getList() {

    const { getListDispatch, todolist } = this.props

    if (!localStorage.getItem("todolist")) {
      localStorage.setItem("todolist", JSON.stringify(todolist))
    }
    else {
      let todolistLocal = JSON.parse(localStorage.getItem("todolist"))
      getListDispatch(todolistLocal)
      
      this.getListActive()
      this.getListCompleted()
    }

  } // getList

  getListActive() {

    const { getListActiveDispatch } = this.props

    let todolistLocal = JSON.parse(localStorage.getItem("todolist"))

    let updatedList = todolistLocal.filter(function (item, index) {
      return item.completed === false
    })

    getListActiveDispatch( updatedList )

  } // getListActive

  getListCompleted() {

    const { getListCompletedDispatch } = this.props

    let todolistLocal = JSON.parse(localStorage.getItem("todolist"))

    let updatedList = todolistLocal.filter(function (item, index) {
      return item.completed === true
    })

    getListCompletedDispatch(updatedList)

  } // getListCompleted

  getValue(e) {  // update state with changed input value

    e.preventDefault()

    const { getInputvalueDispatch } = this.props

    getInputvalueDispatch( e.target.value )
    
  } // getValue

  addItem(e) {

    const { inputValue, todolist, getListDispatch, getInputvalueDispatch } = this.props

    if (!inputValue) {
      return
    }
    else {

      if (e.target.type === "text" && (e.which ? e.which : e.keyCode) !== 13) {
        return
      }

      let todoItem = {
        key: uniqid('todo-'),
        id: uniqid(),
        label: inputValue,
        completed: false
      }

      //let updatedList = todolist;
      todolist.push(todoItem);

      localStorage.setItem("todolist", JSON.stringify(todolist))
      window.location.hash = ''

      getListDispatch(todolist)
      getInputvalueDispatch('')

      this.getListActive()
      this.getListCompleted()
    }

  } // addItem

  removeItem(id) {

    const { todolist, getListDispatch } = this.props

    let updatedList = todolist.filter(function (item, index) {
      return item.id !== id
    });

    localStorage.setItem("todolist", JSON.stringify(updatedList))

    getListDispatch(updatedList)

    this.getListActive()
    this.getListCompleted()

  } // removeItem

  getStatus(e, id) {

    const { todolist, getListDispatch } = this.props

    let updatedList = todolist.map((item) => {

      if (item.id === id) {
        if (e.target.checked) {
          item.completed = true
        }
        else {
          item.completed = false
        }
      }

      return item

    });

    localStorage.setItem("todolist", JSON.stringify(updatedList))

    getListDispatch(updatedList)
    
    this.getListActive()
    this.getListCompleted()

  } // getStatus

  checkLocation() {

    const { todolist, todoActive, todoCompleted, inputValue, hashLocation } = this.props
    
    let list
    let nowShowing = 'all'

    if (hashLocation === '#active') {
      list = todoActive
      nowShowing = 'active'
    }
    else if (hashLocation === '#completed') {
      list = todoCompleted
      nowShowing = 'completed'
    }
    else {
      list = todolist
      nowShowing = 'all'
    }

    return [list, nowShowing]

  } // checkLocation

  render() {

    const { todolist, todoActive, todoCompleted, inputValue, hashLocation } = this.props

    let list, listItems, nowShowing
    
    [list, nowShowing] = this.checkLocation()

    listItems = list.map( (item) => 
      <Checkbox key={item.key} id={item.id} label={item.label} checked={item.completed} removeItem={this.removeItem} getStatus={this.getStatus} />
    )

    return (
      
      <div className="app">

        <div className="header">
          <h2>To Do List</h2>
        </div>

        <div className="row todo-wrapper">
          
          <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
            
            <TodoInput inputValue={inputValue} placeholder="To do Task" btnLabel="Add" getValueHandler={this.getValue} addItemHandler={this.addItem} />

            <div className="row todo-list">
              <ul className="col-xs-12">
                {listItems}
              </ul>
            </div>

            <Footer activeNumber={todoActive.length} nowShowing={nowShowing}/>
            
          </div>

        </div>

      </div>
      
    )
  } // render

}

//export default withRouter(App);

const mapStateToProps = (state) => {
  return {
    todolist: state.todolist,
    todoActive: state.todoActive,
    todoCompleted: state.todoCompleted,
    inputValue: state.inputValue,
    hashLocation: state.hashLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
       getListDispatch: (todolist) => {
           dispatch( getListAll(todolist) )
       },
       getListActiveDispatch: (todoActive) => {
         dispatch( getListActive(todoActive) )
       },
       getListCompletedDispatch: (todoCompleted) => {
         dispatch( getListCompleted(todoCompleted) )
       },
       getHashLocationDispatch: (hashLocation) => {
         dispatch( getHashLocation(hashLocation) )
       },
       getInputvalueDispatch: (inputValue) => {
         dispatch( getInputvalue(inputValue))
       }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))