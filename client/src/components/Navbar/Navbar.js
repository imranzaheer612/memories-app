import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from "react-router-dom";

import configData from "../../config.json";
import "./Navbar.scss"


function Navbar({isClicked, handleNewStory, handleSignUp}) {

  let navigate = useNavigate();

  /**
   * improved routing using window.onpopstate 
  */
  useEffect(() => {
    window.onpopstate = function () {
      navigate(0);
    };
  }, []);


  /**
   * add-story button cause navbar to expand to a form
  */
  return (
    <div className={`nav ${(isClicked) ? 'nav__opened' : ''}`}>
        <div className='nav__title'>{configData.app_name}</div>
        <button className="nav__button" onClick={handleNewStory}>Add Story</button>
        <button className="nav__button" onClick={handleSignUp}>Sign Up</button>

        <Outlet/>
    </div>
  )
}

export default Navbar