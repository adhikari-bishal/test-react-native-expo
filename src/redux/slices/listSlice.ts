import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/api";

interface Item {
  id: number;
  name: string;
}

interface ListState {
  data: Item[];
  dataSource: Item[];
  selectedItems: Item[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  data: [],
  dataSource: [],
  selectedItems: [],
  searchTerm: "",
  loading: false,
  error: "",
};

export const fetchData = createAsyncThunk("list/fetchData", async () => {
  const response = await fetch(API_URL);
  const result = await response.json();

  return result as Item[];
});

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.dataSource = state.data.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    toggleSelectItem: (state, action: PayloadAction<Item>) => {
      const isSelected = state.selectedItems.some(
        (selected) => selected.id === action.payload.id,
      );
      state.selectedItems = isSelected
        ? state.selectedItems.filter((item) => item.id !== action.payload.id)
        : [...state.selectedItems, action.payload];
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.dataSource = state.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.dataSource = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
        console.error("Error fetching data:", state.error);
      });
  },
});

export const { setSearchTerm, toggleSelectItem, clearSearch } =
  listSlice.actions;
export default listSlice.reducer;
