import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const SendPassword = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { error, loading, mailSent, forgotPassword, clearError } = authContext;
  const { setAlert, alerts } = alertContext;

  useEffect(() => {
    if (!loading && mailSent) {
      props.history.push("/login");
      setAlert("Reset Link is sent to your email id", null, "success");
    }

    if (error) {
      setAlert(error, null, "danger");
    }

    return () => {
      clearError();
    };
    // eslint-disable-next-line
  }, [error, mailSent, loading]);

  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const onInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "") {
      return setAlert("Please Enter Email", "email", "danger");
    }
    forgotPassword(formData);
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
      <button className="btn" onClick={onFormSubmitHandler}>
        Submit
      </button>
    </form>
  );
};

export default SendPassword;
