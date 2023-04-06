import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config";
import "./Header.css";
function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => navigate("/sign-in"))
      .catch((error) => {});
  };

  return (
    <div className="header">
      <div className="header_title">
        <p>Tasker</p>
      </div>
      <div className="icon_buttons">
        <img className="notification_icon" src="notification_icon.png" alt="" />
        <img className="menu_icon" src="menu_icon.png" alt="" />
        <button className="btn-log-out" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Header;
