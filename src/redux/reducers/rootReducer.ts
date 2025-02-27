import { combineReducers } from "@reduxjs/toolkit";
import { characterSlice } from "./characterSlice";

const rootReducer = combineReducers({
  character: characterSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export {};
