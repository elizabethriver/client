import React from 'react'
import './style/button.css'

export const Button = ({type, name, onClick, children}) => {
  let classButton = ''
  switch(name) {
    case 'linkLogin':
      classButton = 'classLink'
      break;
    case 'submit':
      classButton = 'classButton'      
      break;
    default:
      // code block
  }
  // const classButton = type === 'link' ? 'classLink' : 'classButton'
  return (
    <button className={`${classButton} button_link` } type={type} name={name} onClick={onClick} >{children}</button>
  )
}
