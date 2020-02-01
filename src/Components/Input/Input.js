import React from 'react';

import * as styles from './Input.module.css';

const input = (props) => {
    return(
        <div>
            <h4>{props.elementLabel}</h4>
            <label>Current</label>
            <input type={props.elementType}
                min={props.min} 
                max={props.max}
                onChange={props.changedCurrent}/>
            <label>Target</label>
            <input type={props.elementType} 
                min={props.min} 
                max={props.max}
                onChange={props.changedTarget}/>
        </div>
    )
}
export default input;