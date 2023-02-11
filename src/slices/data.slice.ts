import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { numberSorterHelper } from "../utils/sort-number";
import { Data } from "./../types/data-table-body";
import { fetchDataAction } from "./actions";

export type Filter = {
  filterName: string;
  amoung: string | null;
  value: string | number | string[] | null | any;
};

type InitialState = {
  isLoading: boolean;
  dataList: Data[];
  filterList: Filter[];
};

const initialState: InitialState = {
  dataList: null,
  isLoading: true,
  filterList: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearData: (state) => {
      state.dataList = [];
    },
    load: (state) => {
      state.isLoading = true;
    },
    stopLoad: (state) => {
      state.isLoading = false;
    },
    clearFilters: (state) => {
      state.filterList = [];
    },
    sortPrice: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "price"
      );
    },
    sortChange: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "CHG"
      );
    },
    sortChangePercent: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "CHG%"
      );
    },
    sortVolume: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "VOLUME"
      );
    },
    sortMarketCap: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "MKT_CAP"
      );
    },
    sortVolumeInPrice: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "VOLUME*PRICE"
      );
    },
    sortPE: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "P/E"
      );
    },
    sortEmployees: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = numberSorterHelper(
        state.dataList,
        action.payload,
        "EMPLOYEES"
      );
    },
    sortSector: (state, action: PayloadAction<"desc" | "asc">) => {
      state.dataList = state.dataList.sort(function (a, b) {
        return a.SECTOR.localeCompare(b.SECTOR);
      });
      if (action.payload === "asc") {
        state.dataList.reverse();
      }
    },
    sortTechnicalRating: (state, action: PayloadAction<"desc" | "asc">) => {
      const list = state.dataList.sort((a: any, b) => {
        if (a.TECHNICAL_RATING === "Strong Buy") return -1;
        if (b.TECHNICAL_RATING === "Strong Buy") return 1;
        if (a.TECHNICAL_RATING === "Buy") return -1;
        if (b.TECHNICAL_RATING === "Buy") return 1;
        if (a.TECHNICAL_RATING === "Sell") return -1;
        if (b.TECHNICAL_RATING === "Sell") return 1;
        if (a.TECHNICAL_RATING === "Neutral") return -1;
        if (b.TECHNICAL_RATING === "Neutral") return 1;
        return 0;
      });

      if (action.payload === "desc") {
        list.reverse();
      }

      state.dataList = list;
    },
    addFilterhList: (state, action: PayloadAction<any>) => {
      // console.log(action.payload);

      const { filterName } = action.payload;

      const filterList = state.filterList;

      // If there is no filter in filterList
      if (filterList.length === 0) {
        state.filterList = [action.payload];
        return;
      } else {
        // Item exists or not
        const existsInFilterList = state.filterList.find(
          (f) => f.filterName === filterName
        );

        if (existsInFilterList) {
          const filterdFilterList = filterList.filter(
            (f: Filter) => f.filterName !== filterName
          );

          const modifiedFilter = action.payload;

          state.filterList = [...filterdFilterList, modifiedFilter];
          return;
        } else {
          state.filterList = [...state.filterList, action.payload];
          existsInFilterList;
        }
      }
    },
    setData: (state, action) => {
      state.dataList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDataAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchDataAction.fulfilled, (state, { payload }) => {
      state.dataList = payload;
      state.isLoading = false;
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
  stopLoad,
  sortChange,
  sortChangePercent,
  sortVolume,
  sortMarketCap,
  sortVolumeInPrice,
  sortPE,
  sortEmployees,
  sortSector,
  sortTechnicalRating,
  addFilterhList,
  setData,
  clearFilters
} = dataSlice.actions;

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
