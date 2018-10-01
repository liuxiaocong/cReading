import { combineReducers } from "redux";
import baseReducer from "./baseReducer";

export default combineReducers( {
  baseStore: baseReducer,
} );
