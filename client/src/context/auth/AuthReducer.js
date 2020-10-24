import {
  AUTH_ERROR,
  CLEAR_EDIT,
  CLEAR_ERROR,
  EDIT_PROFILE,
  EDIT_PROFILE_FAILED,
  FORGOT_PASSWORD,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_CHANGED,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../type/type";

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case AUTH_ERROR:
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
        token: null,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        mailSent: true,
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        loading: false,
        mailSent: false,
        resetPassword: true,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
        profileEdited: true,
      };

    case EDIT_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        profileEdited: false,
      };

    case CLEAR_EDIT:
      return {
        ...state,
        loading: false,
        profileEdited: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
