import React from 'react'
import './Button.css'

export default props => {
    return <button
        onClick={e => props.click &&  props.click(props.name)} 
        className={`
        button
        ${props.operation ? 'operation': ''}
        ${props.double ? 'double': ''}
        ${props.triple ? 'triple' : ''}
    `}>
        {props.name}
    
    </button>
}
