import React, { useState } from 'react'
import NewStory from '../NewStory'
import "./Navbar.scss"
import configData from "../../config.json";


function Navbar() {

  const [isClicked, setClicked] = useState(false)

  const handleClick = (e) => {
    setClicked(true);
  }

  const handleBack = (e) => {
    setClicked(false);
  }

  return (
    <div className={`nav ${isClicked ? 'nav__opened' : ''}`}>
        <div className='nav__title'>{configData.app_name}</div>
        <button className="nav__button" onClick={handleClick}>Add Story</button>

        {isClicked && <NewStory handleBack={handleBack}></NewStory>}

    </div>
  )
}

export default Navbar