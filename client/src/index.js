import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ExpenseState from "./context/expenses/ExpenseState";
import LayoutState from "./context/layout/LayoutState";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";

ReactDOM.render(
  <AuthState>
    <ExpenseState>
      <LayoutState>
        <AlertState>
          <App />
        </AlertState>
      </LayoutState>
    </ExpenseState>
  </AuthState>,
  document.getElementById("root")
);
