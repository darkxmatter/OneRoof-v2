import React from 'react';


const Months = (props) => {
  
  return (
    <option key={'select' + props.month} value={props.month}>{props.month}</option>
  )
}

export default Months; 
