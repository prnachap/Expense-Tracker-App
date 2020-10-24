import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.scss";
import Dashboard from "./components/dashboard/Dashboard";
import Stats from "./components/dashboard/Stats";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/profile/Profile";
import ProfileForm from "./components/profile/ProfileForm";
import setAuthToken from "./utils/setAuthToken";
import SendPassword from "./components/auth/SendPassword";
import PasswordReset from "./components/auth/PasswordReset";
import PrivateRouting from "./components/routing/PrivateRouting";
import AuthContext from "./context/auth/AuthContext";
import Alert from "./components/layout/error/Alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <Alert />
        <Switch>
          <PrivateRouting path="/" exact component={Dashboard} />
          <PrivateRouting path="/stats" exact component={Stats} />
          <PrivateRouting path="/profile" exact component={Profile} />
          <PrivateRouting
            path="/profile-edit/:id"
            exact
            component={ProfileForm}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/forgot-password" exact component={SendPassword} />
          <Route path="/reset/:token" exact component={PasswordReset} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
