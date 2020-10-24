import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const PasswordReset = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert, alerts } = alertContext;
  const {
    resetPassword,
    error,
    loading,
    passwordChanged,
    clearError,
  } = authContext;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  useEffect(() => {
    if (!loading && resetPassword) {
      props.history.push("/login");
      setAlert("Password Changed", null, "success");
    }

    if (error) {
      setAlert(error, null, "danger");
    }

    return () => {
      clearError();
    };

    // eslint-disable-next-line
  }, [error, resetPassword, loading]);

  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (password === "" || password.length < 8) {
      return setAlert(
        "Password cannot be empty and should have min length of 8",
        "password",
        "danger"
      );
    } else if (password !== confirmPassword) {
      return setAlert("Password doesn't match", "confirmPassword", "danger");
    }
    passwordChanged(props.match.params.token, formData);
  };

  return (
    <form className="form form__login">
      <h1 className="heading__primary text-center mg-top-lg">eXpense</h1>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          New Password
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
        Change Password
      </button>
    </form>
  );
};

export default PasswordReset;
