import React, {Component} from 'react'

class Checkbox extends Component {

  constructor(props) {
    super(props)

    // This binding is necessary to make `this` work in the callback
    this.removeItemHandler = this.removeItemHandler.bind(this)
    this.getStatusHandler = this.getStatusHandler.bind(this)
  }

  removeItemHandler(e) {
    e.preventDefault()
    this.props.removeItem(this.props.id)
  }

  getStatusHandler(event) {
    this.props.getStatus( event, this.props.id)
  }

  render() {

    return (
      <li className={"checkbox-item row" + (this.props.checked ? " checked" : "") }>
        <input className="col-xs-1"  checked={this.props.checked} type="checkbox" id={this.props.id} onChange={this.getStatusHandler} />
        <label className="col-xs-11" htmlFor={this.props.id}>{this.props.label}</label>
        <span className="delete-item" onClick={this.removeItemHandler}>X</span>
      </li>
    )
  }

}

export default Checkbox;