import { combineReducers } from "redux";
import baseReducer from "./baseReducer";
import readingReducer from "./readingReducer";

export default combineReducers( {
  baseStore: baseReducer,
  readingStore: readingReducer,
} );
