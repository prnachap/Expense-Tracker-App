import React, { useContext, useState } from "react";
import moment from "moment";
import Alert from "../../layout/error/Alert";
import ExpenseContext from "../../../context/expenses/ExpenseContext";
import AlertContext from "../../../context/alert/AlertContext";

// form to edit and add expenses
const AddExpense = () => {
  const expenseContext = useContext(ExpenseContext);
  const alertContext = useContext(AlertContext);
  const {
    hideModal,
    createExpense,
    current,
    loading,
    editExpense,
  } = expenseContext;

  const { setAlert, alerts } = alertContext;

  const [formData, setFormData] = useState({
    title: !loading && current ? current.title : "",
    amount: !loading && current ? current.amount : "",
    date: !loading && current ? moment(current.date).format("YYYY-MM-DD") : "",
    category: !loading && current ? current.category : "food & drinks",
    type: !loading && current ? current.type : "expense",
  });

  const { title, amount, date, category, type } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    hideModal();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (title === "" || title.length < 3) {
      return setAlert(
        "Title cannot be Empty and length should Be greater than 3",
        "title",
        "danger"
      );
    } else if (amount === "" || parseInt(amount) <= 0) {
      return setAlert(
        "Amount cannot be Empty and should Be greater than 0",
        "amount",
        "danger"
      );
    } else if (date === "") {
      return setAlert("Date cannot be Empty", "date", "danger");
    }

    createExpense(formData);
  };

  const onEditHandle = (e) => {
    e.preventDefault();
    editExpense(current._id, formData);
  };

  return (
    <form className="form">
      <Alert />
      <h1 className="heading__primary form__header text-center">
        Expense Details
      </h1>
      <div className="form__group">
        <label className="form__label" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onInputChange}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "title" ? "error" : null
          }`}
          placeholder="Please Add Title"
          autoComplete="off"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="amount">
          Amount
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={onInputChange}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "amount" ? "error" : null
          }`}
          placeholder="Please Add Amount"
          autoComplete="off"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={onInputChange}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "date" ? "error" : null
          }`}
          placeholder="Date"
          autoComplete="off"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={onInputChange}
          name="category"
          className="form__input"
        >
          <option value="food & drinks">food & drinks</option>
          <option value="fuel">fuel</option>
          <option value="home">home</option>
          <option value="bills">bills</option>
          <option value="shopping">shopping</option>
          <option value="others">others</option>
        </select>
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="type">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={onInputChange}
          className="form__input"
        >
          <option value="expense">expense</option>
          <option value="income">income</option>
        </select>
      </div>
      {!loading && current ? (
        <button className="btn" onClick={onEditHandle}>
          Edit Expense
        </button>
      ) : (
        <button className="btn btn-dark" onClick={onSubmitHandler}>
          Add Expense
        </button>
      )}

      <button className="btn btn-light" onClick={onCancelHandler}>
        Cancel
      </button>
    </form>
  );
};

export default AddExpense;
