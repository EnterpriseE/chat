import React from 'react'
import './Footer.css'

function Footer() {
const logo = 'logo.svg'; 
  return (
    <div className='footerContainer'>
        
        <img
                className='left-logo'
                alt='logo'
                src= {logo}
              />
    </div>
  )
}

export default Footer