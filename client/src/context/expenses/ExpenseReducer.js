import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  SHOW_EXPENSES,
  SHOW_MODAL,
  HIDE_MODAL,
  EDIT_BUDGET,
  SHOW_BUDGET,
  CURRENT_EXPENSE,
  MONTHLY_EXPENSES,
  CLEAR_EXPENSES,
} from "../type/type";
import moment from "moment";

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_MODAL:
      return { ...state, loading: false, modal: true };
    case HIDE_MODAL:
      return {
        ...state,
        loading: false,
        modal: false,
        budgetShow: false,
        current: false,
      };
    case SHOW_EXPENSES:
      return {
        ...state,
        expenses: [...payload.expense],
        loading: false,
        modal: false,
        current: null,
        expense: [...payload.expense]
          .map((expense) => expense.type === "expense" && expense.amount)
          .reduce((a, b) => a + b, 0),

        income: [...payload.expense]
          .map((income) => income.type === "income" && income.amount)
          .reduce((a, b) => a + b, 0),
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, payload.expense],
        loading: false,
        modal: false,
        current: null,
        expense: [...state.expenses, payload.expense]
          .map((expense) => expense.type === "expense" && expense.amount)
          .reduce((a, b) => a + b, 0),

        income: [...state.expenses, payload.expense]
          .map((income) => income.type === "income" && income.amount)
          .reduce((a, b) => a + b, 0),
      };
    case CURRENT_EXPENSE:
      return {
        ...state,
        loading: false,
        modal: true,
        budgetShow: false,
        current: payload,
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
        loading: false,
        current: null,
        modal: false,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (item) => item._id.toString() !== payload.toString()
        ),
        loading: false,
        modal: false,
        budgetShow: false,
        current: null,
      };
    case EDIT_BUDGET:
      return {
        ...state,
        loading: false,
        income: parseInt(state.income) + parseInt(payload),
        budgetShow: false,
        modal: false,
        current: null,
      };
    case SHOW_BUDGET:
      return { ...state, budgetShow: true, loading: false, current: null };
    case MONTHLY_EXPENSES:
      return {
        ...state,
        loading: false,
        monthlyExpense: state.expenses.filter(
          (expense) =>
            moment(expense.date).format("MMMM") === payload &&
            expense.type === "expense" &&
            expense
        ),
      };

    case CLEAR_EXPENSES:
      return {
        ...state,
        modal: false,
        expenses: [],
        loading: true,
        budgetShow: false,
        income: 0,
        expense: 0,
        current: null,
        monthlyExpense: [],
      };
    default:
      return state;
  }
};
