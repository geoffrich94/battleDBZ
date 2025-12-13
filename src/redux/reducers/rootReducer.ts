import { combineReducers } from "@reduxjs/toolkit";
import { characterSlice } from "./characterSlice";
import { battleSlice } from "./battleSlice";

const rootReducer = combineReducers({
  character: characterSlice.reducer,
  battle: battleSlice.reducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export {};
