import React from "react";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <div className="header_title">
        <p>Tasker</p>
      </div>
      <div className="icon_buttons">
        <img className="notification_icon" src="notification_icon.png" alt="" />
        <img className="menu_icon" src="menu_icon.png" alt="" />
      </div>
    </div>
  );
}

export default Header;
