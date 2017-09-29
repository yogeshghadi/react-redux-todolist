import React from "react";

import {Link} from "react-router-dom";


const Footer = (props) => (
  <div className="row todo-footer">

    <div className="active-number col-xs-4">
      <Link to="#active" className={ (props.nowShowing === "active") ? "selected" : ""} >
        <span>{props.activeNumber} items left</span>
      </Link>
    </div>

    <div className="filters col-xs-8">
      <Link to="#" className={ (props.nowShowing === "all") ? "selected" : ""} >All</Link>
      <Link to="#active" className={ (props.nowShowing === "active") ? "selected" : ""} >Active</Link>
      <Link to="#completed" className={ (props.nowShowing === "completed") ? "selected" : ""} >Completed</Link>
    </div>
    
  </div>
); 

export default Footer;