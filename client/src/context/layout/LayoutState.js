import React, { useReducer } from "react";
import LayoutContext from "./LayoutContext";
import LayoutReducer from "./LayoutReducer";
import { SHOW_SIDEBAR, HIDE_SIDEBAR } from "../type/type";

export default (props) => {
  const initialState = {
    sidebar: false,
  };

  const [state, dispatch] = useReducer(LayoutReducer, initialState);

  const showSidebar = async () => {
    dispatch({ type: SHOW_SIDEBAR, payload: true });
  };

  const hideSidebar = async () => {
    dispatch({ type: HIDE_SIDEBAR, payload: false });
  };

  return (
    <LayoutContext.Provider
      value={{ sidebar: state.sidebar, showSidebar, hideSidebar }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
};
