import React, { Fragment, useContext, useEffect, useState } from "react";
import Donut from "../charts/Donut";
import SpendList from "../spends/spendLists/SpendList";
import Modal from "../layout/modal/Modal";
import ExpenseContext from "../../context/expenses/ExpenseContext";
import BudgetForm from "../budget/BudgetForm";
import AddExpense from "../expenseForm/addExpense/AddExpense";
import LayoutContext from "../../context/layout/LayoutContext";
import { Link } from "react-router-dom";
import moment from "moment";

const Stats = () => {
  const expenseContext = useContext(ExpenseContext);
  const layoutContext = useContext(LayoutContext);

  // managing input state
  const [input, setInput] = useState(
    moment(new Date().toISOString().slice(0, 10)).format("MMMM")
  );

  // on input change
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const {
    modal,
    loading,
    budgetShow,
    monthlyExpense,
    monthlyExpenses,
  } = expenseContext;
  const { hideSidebar } = layoutContext;

  // hide sidemenu when component is first mounted
  useEffect(() => {
    hideSidebar();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    monthlyExpenses(input);
    // eslint-disable-next-line
  }, [input]);

  return (
    <Fragment>
      <div className="chart__navigation">
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <form className="chart__form">
          <select
            value={input}
            onChange={onInputChange}
            name="months"
            className="form__input"
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="Novemeber">Novemeber</option>
            <option value="December">December</option>
          </select>
        </form>
        <div className="navigation-search">
          <i className={`fas fa-search`}></i>
        </div>
      </div>
      <div className="chart">
        {!loading && monthlyExpense.length > 0 ? (
          <Donut data={monthlyExpense} />
        ) : (
          <h3 style={{ margin: "4rem 0rem" }}>No Expenses Yet</h3>
        )}

        <SpendList expenses={monthlyExpense} loading={loading} edit={false} />
      </div>
      {modal && <Modal>{budgetShow ? <BudgetForm /> : <AddExpense />}</Modal>}
    </Fragment>
  );
};

export default Stats;
