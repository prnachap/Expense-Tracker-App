import React, { useReducer } from "react";
import axios from "axios";
import ExpenseReducer from "./ExpenseReducer";
import ExpenseContext from "./ExpenseContext";

import {
  SHOW_MODAL,
  HIDE_MODAL,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  SHOW_BUDGET,
  EDIT_BUDGET,
  DELETE_EXPENSE,
  CURRENT_EXPENSE,
  SHOW_EXPENSES,
  MONTHLY_EXPENSES,
  CLEAR_EXPENSES,
} from "../type/type";

const ExpenseState = (props) => {
  const initialState = {
    modal: false,
    expenses: [],
    loading: true,
    budgetShow: false,
    income: 0,
    expense: 0,
    current: null,
    monthlyExpense: [],
  };

  const [state, dispatch] = useReducer(ExpenseReducer, initialState);

  const showModal = () => {
    dispatch({ type: SHOW_MODAL, payload: true });
  };
  const hideModal = () => {
    dispatch({ type: HIDE_MODAL, payload: false });
  };

  // create expense
  const createExpense = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const response = await axios.post("/api/v1/expenses", formData, config);

      dispatch({ type: ADD_EXPENSE, payload: response.data });
    } catch (error) {
      console.log(error.response);
    }
  };

  // show all expenses or income
  const showExpenses = async () => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const response = await axios.get("/api/v1/expenses", config);
      dispatch({ type: SHOW_EXPENSES, payload: response.data });
    } catch (error) {
      console.log(error.response);
    }
  };

  // edit budget
  const editBudget = async (formData) => {
    dispatch({ type: EDIT_BUDGET, payload: formData });
  };

  // show budget modal
  const showBudget = async () => {
    dispatch({ type: SHOW_BUDGET, payload: true });
  };

  // edit expense or income
  const editExpense = async (id, formData) => {
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `/api/v1/expenses/${id}`,
        formData,
        config
      );

      dispatch({ type: EDIT_EXPENSE, payload: response.data.expense });
    } catch (error) {
      console.log(error);
    }
  };

  // delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/expenses/${id}`);
      dispatch({ type: DELETE_EXPENSE, payload: response.data.expense._id });
      showExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  // current expense
  const currentExpense = async (item) => {
    dispatch({ type: CURRENT_EXPENSE, payload: item });
  };

  // get current month expenses
  const monthlyExpenses = (month) => {
    dispatch({ type: MONTHLY_EXPENSES, payload: month });
  };

  // clear expenses on logout
  const clearExpenses = () => {
    dispatch({ type: CLEAR_EXPENSES });
  };

  return (
    <ExpenseContext.Provider
      value={{
        modal: state.modal,
        expenses: state.expenses,
        budgetShow: state.budgetShow,
        income: state.income,
        expense: state.expense,
        current: state.current,
        loading: state.loading,
        monthlyExpense: state.monthlyExpense,
        editBudget,
        showBudget,
        showModal,
        hideModal,
        createExpense,
        currentExpense,
        editExpense,
        deleteExpense,
        showExpenses,
        monthlyExpenses,
        clearExpenses,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
