import React, { Fragment, useContext, useEffect } from "react";
import Budget from "../budget/Budget";
import SpendList from "../spends/spendLists/SpendList";
import Footer from "../layout/footer/Footer";
import Navigation from "../layout/navigation/Navigation";
import SideBar from "../layout/navigation/sidebar/SideBar";
import ExpenseContext from "../../context/expenses/ExpenseContext";
import BudgetForm from "../budget/BudgetForm";
import AddExpense from "../expenseForm/addExpense/AddExpense";
import Modal from "../layout/modal/Modal";
import AuthContext from "../../context/auth/AuthContext";

const Dashboard = () => {
  const expenseContext = useContext(ExpenseContext);
  const authContext = useContext(AuthContext);
  const { modal, budgetShow, showExpenses, expenses, loading } = expenseContext;
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    showExpenses();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Navigation />
      <SideBar />
      <Budget />
      <SpendList expenses={expenses} loading={loading} />
      <Footer />
      {modal && <Modal>{budgetShow ? <BudgetForm /> : <AddExpense />}</Modal>}
    </Fragment>
  );
};

export default Dashboard;
