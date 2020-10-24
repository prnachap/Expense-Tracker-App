import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGOUT,
  FORGOT_PASSWORD,
  PASSWORD_CHANGED,
  EDIT_PROFILE,
  EDIT_PROFILE_FAILED,
  CLEAR_EDIT,
  CLEAR_ERROR,
} from "../type/type";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: false,
    error: null,
    mailSent: false,
    resetPassword: false,
    profileEdited: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //   load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const response = await axios("/api/v1/auth");
      dispatch({ type: USER_LOADED, payload: response.data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
  };

  //   register user
  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post("/api/v1/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.token });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.response.data.message });
    }
  };

  //   login user
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/api/v1/auth", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.response.data.message });
    }
  };

  // forgot-password
  const forgotPassword = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post("/api/v1/auth/forgot-password", formData, config);
      dispatch({ type: FORGOT_PASSWORD, payload: true });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  // password changed
  const passwordChanged = async (token, formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        `/api/v1/auth/reset-password/${token}`,
        formData,
        config
      );
      dispatch({ type: PASSWORD_CHANGED, payload: true });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  //   logout user
  const logout = async () => {
    try {
      await axios.get("/api/v1/auth/logout");
      dispatch({ type: LOGOUT });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  // edit user
  const editUser = async (id, data) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ username: data.username, email: data.email })
    );
    formData.append("image", data.profileImage);

    try {
      const response = await axios.put(
        `/api/v1/users/edit-profile/${id}`,
        formData,
        config
      );
      dispatch({ type: EDIT_PROFILE, payload: response.data.user });
    } catch (error) {
      dispatch({
        type: EDIT_PROFILE_FAILED,
        payload: error.response.data.message,
      });
    }
  };
  // delete profile
  const deleteProfile = async () => {
    try {
      await axios.delete("/api/v1/auth");
      dispatch({ type: AUTH_ERROR, payload: null });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.message });
    }
  };

  // clear edit state
  const clearEditState = () => {
    dispatch({ type: CLEAR_EDIT });
  };

  // clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        mailSent: state.mailSent,
        resetPassword: state.resetPassword,
        profileEdited: state.profileEdited,
        loadUser,
        registerUser,
        login,
        logout,
        forgotPassword,
        passwordChanged,
        editUser,
        clearEditState,
        clearError,
        deleteProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
