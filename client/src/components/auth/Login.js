import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  let { setAlert, alerts } = alertContext;
  const { isAuthenticated, login, error, clearError } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error) {
      setAlert(error, null, "danger");
    }

    return () => {
      clearError();
    };

    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "") {
      return setAlert("Please Enter Email", "email", "danger");
    } else if (password === "") {
      return setAlert("Please Enter Password", "password", "danger");
    }
    login(formData);
  };

  return (
    <form className="form form__login">
      <h1 className="heading__primary text-center">eXpense</h1>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onInputChangeHandler}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "email" ? "error" : null
          }`}
          placeholder="email@domain.com"
          autoComplete="off"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onInputChangeHandler}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "password" ? "error" : null
          }`}
          placeholder="Enter Password"
          autoComplete="off"
        />
      </div>
      <button className="btn" onClick={onFormSubmitHandler}>
        Login
      </button>
      <div className="form__routing">
        <Link to="/forgot-password" className="form__routing__link">
          Forgot Password?
        </Link>
        <Link to="/signup" className="form__routing__link">
          Not a Member? Signup Now
        </Link>
      </div>
    </form>
  );
};

// ${error && name === "password" && "error"}

export default Login;
