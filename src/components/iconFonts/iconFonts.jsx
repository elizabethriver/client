import React from 'react'
import './style/iconFonts.css'

export const IconFonts = ({icon, label}) => {
  return (
    <div className='container-nav'>
        <span className="material-symbols-outlined">{icon}</span>
        <small className='iconLabel'>{label}</small>
    </div>
  )
}
