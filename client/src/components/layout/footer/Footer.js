import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ExpenseContext from "../../../context/expenses/ExpenseContext";

const Footer = () => {
  const expenseContext = useContext(ExpenseContext);

  const { showModal } = expenseContext;

  const onButtonClick = () => {
    showModal();
  };

  return (
    <footer className="footer">
      <div className="footer__notification">
        <i className={`fas fa-bell footer__icon`} />
        <div className="footer__dot"></div>
      </div>
      <button className="footer__btn" onClick={onButtonClick}>
        +
      </button>
      <div>
        <Link to="/stats">
          <i className={`fas fa-chart-bar footer__icon`} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
