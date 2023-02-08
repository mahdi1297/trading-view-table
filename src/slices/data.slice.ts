import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dynamicSort, sortNumber } from "../utils/sort-number";
import { Data } from "./../types/data-table-body";
import { fetchDataAction } from "./actions";

type InitialState = {
  isLoading: boolean;
  dataList: Data[];
};

const initialState: InitialState = {
  dataList: null,
  isLoading: false,
};

function sorterHelper(list: Data[], order: "desc" | "asc", param: string) {
  let sortedList = sortNumber(list, param);
  if (order === "asc") {
    sortedList.reverse();
  }
  return sortedList;
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearData: (state) => {
      state.dataList = [];
    },
    load: (state) => {
      state.isLoading = true;

      setTimeout(() => {
        state.isLoading = false;
      }, 500);
    },
    sortPrice: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(state.dataList, action.payload, "price");
    },
    sortChange: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(state.dataList, action.payload, "CHG");
    },
    sortChangePercent: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(state.dataList, action.payload, "CHG%");
    },
    sortVolume: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(state.dataList, action.payload, "VOLUME");
    },
    sortMarketCap: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(state.dataList, action.payload, "MKT_CAP");
    },
    sortVolumeInPrice: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(
        state.dataList,
        action.payload,
        "VOLUME*PRICE"
      );
    },
    sortPE: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(state.dataList, action.payload, "P/E");
    },
    sortEmployees: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = sorterHelper(
        state.dataList,
        action.payload,
        "EMPLOYEES"
      );
    },
    sortSector: (state, action: PayloadAction<"desc" | "asc">) => {
      console.log("sector");
      // let sortedList = sortNumber(state.dataList, "EMPLOYEES");
      // if (action.payload === "asc") {
      //   sortedList.reverse();
      // }
      // state.dataList = sortedList;
      // load();

      const newData = state.dataList.sort(function (a, b) {
        return a.SECTOR.localeCompare(b.SECTOR);
      });

      console.log(state.dataList);
      console.log(newData);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDataAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchDataAction.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.dataList = payload;
    });

    builder.addCase(fetchDataAction.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.dataList = [];
    });
  },
});

export const {
  sortPrice,
  load,
  sortChange,
  sortChangePercent,
  sortVolume,
  sortMarketCap,
  sortVolumeInPrice,
  sortPE,
  sortEmployees,
  sortSector,
} = dataSlice.actions;

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
