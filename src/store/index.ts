import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./../slices/data.slice";

const store = configureStore({
  reducer: {
    dataSlice: dataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {};

export default store;
