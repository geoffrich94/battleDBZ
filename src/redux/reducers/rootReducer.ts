import { combineReducers } from "@reduxjs/toolkit";
import { characterSlice } from "./characterSlice";
// import battleReducer from "./reducers/battleSlice.ts";

export default combineReducers({
  character: characterSlice.reducer
})