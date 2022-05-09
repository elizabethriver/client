import React from 'react'
import './style/button.css'

export const Button = ({type, onClick, children}) => {
  const classButton = type === 'link' ? 'classLink' : 'classButton'
  return (
    <button className={`${classButton} button_link` } type={type} onClick={onClick} >{children}</button>
  )
}
