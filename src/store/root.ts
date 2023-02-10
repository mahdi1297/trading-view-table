import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./../slices/data.slice";

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
