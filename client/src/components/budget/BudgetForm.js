import React, { useContext, useState } from "react";
import ExpenseContext from "../../context/expenses/ExpenseContext";

// component to edit budget
const BudgetForm = () => {
  const [budget, setBudget] = useState(0);

  const onInputChange = (e) => {
    setBudget(e.target.value);
  };

  const expenseContext = useContext(ExpenseContext);

  const { hideModal, editBudget } = expenseContext;

  const onClickCancel = (e) => {
    e.preventDefault();
    hideModal();
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    editBudget(budget);
  };

  return (
    <form className="form">
      <h1
        className="heading__primary form__header text__center"
        style={{ marginTop: "-4rem" }}
      >
        Budget For June
      </h1>
      <div className="form__group">
        <label className="form__label" htmlFor="budget">
          Budget
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={budget}
          onChange={onInputChange}
          className="form__input"
          placeholder="Please Add Title"
          autoComplete="off"
        />
      </div>
      <button className="btn" onClick={onClickSubmit}>
        Change Budget
      </button>
      <button className="btn btn-light" onClick={onClickCancel}>
        Cancel
      </button>
    </form>
  );
};

export default BudgetForm;
