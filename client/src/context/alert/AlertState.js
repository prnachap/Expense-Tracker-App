import React, { useReducer } from "react";
import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";
import {v4 as uuidv4} from "uuid"
import {  CLEAR_ALERT, SET_ALERT } from "../type/type";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // set Alert
  const setAlert = async(msg,name=null,type,timeout=5000)=>{
    const id = uuidv4()
    dispatch({type:SET_ALERT,payload:{msg,type,name,id}})
    setTimeout(() => {
      dispatch({type:CLEAR_ALERT,payload:id})
    }, timeout);

  }

  return (
    <AlertContext.Provider
      value={{ alerts:state,setAlert }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
