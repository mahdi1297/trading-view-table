import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDataAction = createAsyncThunk("project/create", async () => {
  const result = await axios.get("/data/coins.json");
  return result.data;
});
