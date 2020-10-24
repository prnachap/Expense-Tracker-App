import React, { useContext } from "react";
import LayoutContext from "../../../context/layout/LayoutContext";

// navigation component
const Navigation = () => {
  // context to manage state of sidemenu
  const layoutContext = useContext(LayoutContext);
  const { showSidebar } = layoutContext;

  const sideMenuHandler = (e) => {
    showSidebar();
  };

  return (
    <nav className="navigation">
      <div className="menuIcon" onClick={sideMenuHandler}>
        <div className="menuIcon__line"></div>
      </div>
      <h1 className="heading__primary">Dashboard</h1>
      <div className="navigation-search">
        <i className={`fas fa-search`}></i>
      </div>
    </nav>
  );
};

export default Navigation;
