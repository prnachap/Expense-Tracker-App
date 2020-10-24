import { HIDE_SIDEBAR, SHOW_SIDEBAR } from "../type/type";

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_SIDEBAR:
    case HIDE_SIDEBAR:
      return { ...state, sidebar: payload };
    default:
      return state;
  }
};
