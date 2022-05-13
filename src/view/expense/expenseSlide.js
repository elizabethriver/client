import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { expensePost } from "../../api/api";
import { removeKeyFromLocalStorage } from "../../utils/utils";

const initialState = {
  dataExpense: [],
  loading: false,
  status: null
};

export const expensePostTrunk = createAsyncThunk(
  "expensePost/api",
  async (dataExpense) => {
    const { token, product, expense } = dataExpense;
    let response = null;

    try {
      response = await expensePost(token, product, expense);
      console.log(response)

      return response.data;
    } catch (error) {
      response = error.response;
      console.log(error)
      if (response.status === 403) {
        removeKeyFromLocalStorage('token')
        removeKeyFromLocalStorage('name')
      }
      throw error;    
    }
  }
);

const expenseSlide = createSlice({
  name: "dataExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(expensePostTrunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(expensePostTrunk.fulfilled, (state, action) => {
      state.loading = false;
      state.dataExpense = action.payload;
    });
    builder.addCase(expensePostTrunk.rejected, (state, action) => {
      state.status = action.error
      state.loading = false;
    });
  },
});

export default expenseSlide.reducer;