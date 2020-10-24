import React, { useContext } from "react";
import Moment from "react-moment";
import ExpenseContext from "../../../context/expenses/ExpenseContext";

const SpendItem = ({ item, edit }) => {
  const { _id, title, amount, date, category, type } = item;
  const expenseContext = useContext(ExpenseContext);

  const { deleteExpense, currentExpense, showModal } = expenseContext;

  const onDeleteHandler = () => {
    deleteExpense(_id);
  };

  const onEditHandler = () => {
    showModal();
    currentExpense(item);
  };

  const iconClasses = {
    "food & drinks": "fas fa-hotdog",
    fuel: "fas fa-charging-station",
    shopping: "fas fa-tshirt",
    home: "fas fa-laptop-house",
    bills: "fas fa-money-bill-wave",
  };

  const backgroundColor =
    category === "food & drinks"
      ? "food"
      : category === "fuel"
      ? "fuel"
      : category === "shopping"
      ? "shop"
      : category === "home"
      ? "home"
      : category === "bills"
      ? "bills"
      : "others";

  return (
    <div className="expense__container">
      <div className={`icon__wrapper ${backgroundColor}`}>
        <i className={`${iconClasses[item.category]} icons`}></i>
      </div>
      <div className="item">
        <div className="item__info">
          <h4 className="item__title">{title}</h4>
          <Moment className="item__date" format="MMM Do">
            {date}
          </Moment>
        </div>
        <div className="item__price__wrapper">
          <p
            className={`item__price ${
              type === "expense" ? "expense" : "income"
            }`}
          >
            &#8377; {amount}
          </p>
          {edit && (
            <div className="icon__container">
              <i
                className={`fas fa-pen edit__icons`}
                onClick={onEditHandler}
              ></i>
              <i
                className={`fas fa-trash edit__icons`}
                onClick={onDeleteHandler}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendItem;
