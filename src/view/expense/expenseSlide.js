import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { expensePost } from "../../api/api";

const initialState = {
  dataExpense: [],
  loading: false,
};

export const expensePostTrunk = createAsyncThunk(
  "expensePost/api",
  async (dataExpense) => {
    const { token, product, expense } = dataExpense;
    try {
      const response = await expensePost(token, product, expense);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const expenseSlide = createSlice({
  name: "dataExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensePostTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensePostTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.dataExpense = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensePostTrunk.rejected, (state) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});

// export const {} = incomeSlide.actions;

export default expenseSlide.reducer;