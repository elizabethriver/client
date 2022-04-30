import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getExpenseByID, putExpenseByID } from "../../api/api";
const initialState = {
  dataExpenseById: [],
  loading: false,
  docUpdateExById: [],
};

export const getExpenseByIdTrunk = createAsyncThunk(
  "getExpenseById/api",
  async (dataExpenseByID) => {
    const { token, expenseId } = dataExpenseByID;
    console.log(token, expenseId)
    try {
      console.log(token, expenseId)
      const response = await getExpenseByID(token, expenseId);
      const { findedObject } = response.data;
      console.log(response.data)
      return findedObject;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const updateExpenseByIdTrunk = createAsyncThunk(
  "updateExpenseByIdTrunk/api",
  async (dataExpenseByID) => {
    const { token, product, expense, expenseId } = dataExpenseByID;
    try {
      const response = await putExpenseByID(token, product, expense, expenseId);
      console.log(response.data);
      const { docUpdate } = response.data;
      console.log(response)
      return docUpdate;
    } catch (error) {
      throw error;
    }
  }
);

const expenseDetailsSlice = createSlice({
  name: "getExpenseByIdTrunk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getExpenseByIdTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getExpenseByIdTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.dataExpenseById = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getExpenseByIdTrunk.rejected, (state) => {
      // Add user to the state array
      state.loading = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateExpenseByIdTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateExpenseByIdTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.docUpdateExById = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateExpenseByIdTrunk.rejected, (state) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});

// export const {} = incomeDetailsSlice.actions

export default expenseDetailsSlice.reducer;
