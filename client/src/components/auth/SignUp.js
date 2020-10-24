import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const SignUp = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert, alerts } = alertContext;
  const { registerUser, error, isAuthenticated, clearError } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
      setAlert("User Created Successfully", null, "success");
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
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;

  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (username === "") {
      return setAlert("Please Enter Name", "username", "danger");
    } else if (email === "") {
      return setAlert("Please Enter Email", "email", "danger");
    } else if (password === "" || password.length < 8) {
      return setAlert(
        "Password cannot be empty and should have min length of 8",
        "password",
        "danger"
      );
    } else if (password !== confirmPassword) {
      return setAlert("Password doesn't match", "confirmPassword", "danger");
    }
    registerUser(formData);
  };

  return (
    <form className="form form__login">
      <h1 className="heading__primary text-center">eXpense</h1>
      <div className="form__group">
        <label className="form__label" htmlFor="username">
          Name
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onInputChangeHandler}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "username" ? "error" : null
          }`}
          placeholder="Please Enter Your Name"
          autoComplete="off"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
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
      <div className="form__group">
        <label className="form__label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onInputChangeHandler}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "confirmPassword"
              ? "error"
              : null
          }`}
          placeholder="Confirm Password"
          autoComplete="off"
        />
      </div>
      <button className="btn" onClick={onFormSubmitHandler}>
        Sign Up
      </button>
      <div className="form__routing">
        <Link to="/login" className="form__routing__link">
          Already a Member? SignIn
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
