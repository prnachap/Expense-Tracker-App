import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import profile from "./profile.png";
import AuthContext from "../../context/auth/AuthContext";
import arrayBufferToBase64 from "../../utils/binaryImage";
import AlertContext from "../../context/alert/AlertContext";
import ExpenseContext from "../../context/expenses/ExpenseContext";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const expenseContext = useContext(ExpenseContext);

  const { setAlert } = alertContext;
  const { user, deleteProfile, error } = authContext;
  const { clearExpenses } = expenseContext;

  const { _id, username, email } = user;

  useEffect(() => {
    if (error) {
      setAlert(error, null, "danger");
    }
    // eslint-disable-next-line
  }, [error]);

  const onDeleteHandler = () => {
    deleteProfile();
    clearExpenses();
  };

  return (
    <div>
      <Link to="/">
        <i className="fas fa-arrow-left"></i>
      </Link>
      <div className="profile__header">
        <h1 className="heading__primary mg-top-xs mg-bt-sm">My Profile</h1>
        <Link to={`/profile-edit/${_id}`}>
          <i className="fas fa-edit profile-edit"></i>
        </Link>
      </div>
      <div className="profile">
        <div className="profile__image__container">
          <img
            className="profile__image"
            src={
              user.photo
                ? `data:${user.photoType};base64,${arrayBufferToBase64(
                    user.photo.data
                  )}`
                : profile
            }
            alt="profile"
          />
        </div>
        <h2 className="heading__secondary">{username}</h2>
        <p className="profile__email">{email}</p>
        <button className="btn btn-delete" onClick={onDeleteHandler}>
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
