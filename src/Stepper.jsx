import React, { useRef, useEffect } from 'react';
import './Stepper.css';

function Stepper (props) {
  {switch(props.step){
    case "Revenues":
      return (
        <div className="container">
          <ul className="progressbar">
              <li className="active">revenues</li>
              <li >expenses</li>
              <li >compare</li>
          </ul>
        </div>
    )
    case "Expenses":
      return(
        <div className="container">
          <ul className="progressbar">
              <li className="active">revenues</li>
              <li className="active">expenses</li>
              <li >compare</li>
          </ul>
        </div>
      )
    
    case "Compare":
      return(
        <div className="container">
          <ul className="progressbar">
              <li className="active">revenues</li>
              <li className="active">expenses</li>
              <li className="active">compare</li>
          </ul>
        </div>
      )
  }}
  
}

export default Stepper;