import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import configData from "../../config.json";
import ProfileMenu from "../ProfileMenu/ProfileMenue";
import "./navbar.scss";

function Navbar({ isClicked, handleNewStory, handleLogin, user }) {
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
    <div className={`nav ${isClicked ? "nav__opened" : ""}`}>
      <div className="nav__title">{configData.app_name}</div>

      {!user ? (
        <button className="nav__button" onClick={handleLogin}>
          Login
        </button>
      ) : (
        <>
          <button className="nav__button" onClick={handleNewStory}>
            Add Story
          </button>
          <ProfileMenu user={user}></ProfileMenu>
        </>
      )}

      <Outlet />
    </div>
  );
}

export default Navbar;
