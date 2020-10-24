import React, { useContext } from "react";
import ExpenseContext from "../../context/expenses/ExpenseContext";
import moment from "moment";

// budget component to how much expenses has occured
const Budget = () => {
  // context to show modal and edit budget for a given month
  const expenseContext = useContext(ExpenseContext);
  const { income, expense } = expenseContext;

  // const onEditHandler = (e) => {
  //   showModal();
  //   showBudget();
  // };
  return (
    <div className="budget__wrapper">
      <h3 className="heading__tertiary">
        BUDGET{" "}
        <span className="heading__tertiary--blue">
          {moment(new Date().toISOString().slice(0, 10))
            .format("MMMM")
            .toUpperCase()}
        </span>{" "}
        <span className="heading__tertiary--gray">
          (&#8377; {expense ? expense : 0} / &#8377; {income ? income : 0})
        </span>{" "}
      </h3>
      <div className="progress__wrapper">
        <div
          className="progress__wrapper__bar"
          style={{ width: `${(expense / income) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Budget;
