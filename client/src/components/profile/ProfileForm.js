import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

// form to edit and add expenses
const ProfileForm = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert, alerts } = alertContext;
  const {
    editUser,
    loading,
    error,
    profileEdited,
    clearEditState,
    user,
    clearError,
  } = authContext;

  const id = props.match.params.id;

  useEffect(() => {
    if (!loading && profileEdited) {
      setAlert("Profile Edited SuccessFully", null, "success");
      props.history.push("/profile");
      clearEditState();
    }

    if (error) {
      setAlert(error, null, "danger");
    }

    return () => {
      clearError();
    };
    // eslint-disable-next-line
  }, [error, loading, profileEdited]);

  const [formData, setFormData] = useState({
    profileImage: "",
    email: !loading && user ? user.email : "",
    username: !loading && user ? user.username : "",
  });

  const { email, username } = formData;

  const onInputChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    props.history.push("/profile");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (email === "") {
      return setAlert("Please Enter Email", "email", "danger");
    } else if (username === "" || username.length < 3) {
      return setAlert(
        "Username cannot be Empty and length should Be greater than 3",
        "username",
        "danger"
      );
    }
    editUser(id, formData);
  };

  return (
    <form className="form">
      <h1 className="heading__primary form__header text-center">
        Edit Profile
      </h1>
      <div className="form__group">
        <label className="form__label" htmlFor="profileImage">
          Profile Picture
        </label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={onInputChange}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "profileImage"
              ? "error"
              : null
          }`}
          placeholder="Add Profile Picture"
          autoComplete="off"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onInputChange}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "email" ? "error" : null
          }`}
          placeholder="Please Add Email"
          autoComplete="off"
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="username">
          Name
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={onInputChange}
          className={`form__input ${
            alerts.length > 0 && alerts[0].name === "username" ? "error" : null
          }`}
          placeholder="Please Enter Your Name"
          autoComplete="off"
        />
      </div>

      <button className="btn" onClick={onSubmitHandler}>
        Edit Profile
      </button>

      <button className="btn btn-light" onClick={onCancelHandler}>
        Cancel
      </button>
    </form>
  );
};

export default ProfileForm;
