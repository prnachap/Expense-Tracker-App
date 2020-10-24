import React, { useContext, useEffect, useRef } from "react";
import profile from "./profile.png";
import LayoutContext from "../../../../context/layout/LayoutContext";
import AuthContext from "../../../../context/auth/AuthContext";
import ExpenseContext from "../../../../context/expenses/ExpenseContext";
import { Link } from "react-router-dom";
import arrayBufferToBase64 from "../../../../utils/binaryImage";

const SideBar = () => {
  const sidebarRef = useRef(null);
  const layoutContext = useContext(LayoutContext);
  const authContext = useContext(AuthContext);
  const expenseContext = useContext(ExpenseContext);
  const { sidebar, hideSidebar } = layoutContext;
  const { user, logout } = authContext;
  const { clearExpenses } = expenseContext;

  // to close sidebar when user selects outside of the component
  useEffect(() => {
    function handleClikOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        hideSidebar();
      }
    }
    document.addEventListener("mousedown", handleClikOutside);

    return () => {
      document.removeEventListener("mousedown", handleClikOutside);
      hideSidebar();
    };
    // eslint-disable-next-line
  }, [sidebarRef]);

  // on Logout
  const onLogoutHandler = () => {
    logout();
    clearExpenses();
  };

  return sidebar ? (
    <div ref={sidebarRef} className="sidemenu">
      <div className="sidemenu__header">
        <div className="sidemenu__line"></div>
        <h1 className="heading__primary sidemenu__title">eXpense</h1>
      </div>

      <div className="sidemenu__user">
        <h2 className="heading__secondary sidemenu__user__name">
          {user.username}
        </h2>
        <div className="sidemenu__image">
          <img
            className="sidemenu__image__user"
            src={
              user.photo
                ? `data:${user.photoType};base64,${arrayBufferToBase64(
                    user.photo.data
                  )}`
                : profile
            }
            alt="profile"
          />
        </div>
      </div>

      <ul className="sidemenu__list">
        <li>
          <Link className="sidemenu__list__link" to="/">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="sidemenu__list__link" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="sidemenu__list__link" to="/stats">
            Statistics
          </Link>
        </li>
        <li>
          <div className="sidemenu__list__link" onClick={onLogoutHandler}>
            Logout
          </div>
        </li>
      </ul>
    </div>
  ) : null;
};

export default SideBar;
