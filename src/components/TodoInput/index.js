import React from 'react'

const TodoInput = (props) => (
  <div className="row todo-input">
    <div className="col-sm-9 col-xs-8">
      <input type="text" placeholder={props.placeholder} value={props.inputValue} onChange={props.getValueHandler} onKeyPress={props.addItemHandler} />  
    </div>
    <div className="col-sm-3 col-xs-4">
      <button type="button" className="btn btn-primary" onClick={props.addItemHandler}>{props.btnLabel}</button>
    </div>
  </div>
)

export default TodoInput