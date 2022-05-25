import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getExpenseByID,
  deleteExpenseByID,
  putExpenseByID,
} from "../../api/api";
import { removeKeyFromLocalStorage } from "../../utils/utils";
const initialState = {
  dataExpenseById: [],
  loading: false,
  docUpdateById: [],
  deleteDocUpdateById: [],
  status: null,
};

export const getExpenseByIdTrunk = createAsyncThunk(
  "getExpenseById/api",
  
  async (dataExpenseByID) => {
    const { token, expenseId } = dataExpenseByID;
    let response = null;
    try {
      response = await getExpenseByID(token, expenseId);
      const { findedObject } = response;
      return findedObject;
    } catch (error) {
      // handle error
      response = error.response;
      if (response.status === 403) {
        removeKeyFromLocalStorage("token");
        removeKeyFromLocalStorage("name");
      }
      throw error;
    }
  }
);

export const updateExpenseByIdTrunk = createAsyncThunk(
  "updateExpenseByIdTrunk/api",
  async (dataExpenseByID) => {
    const { token, product, expense, expenseId } = dataExpenseByID;
    let response = null;
    try {
      response = await putExpenseByID(token, product, expense, expenseId);
      const { docUpdate } = response.data;
      return docUpdate;
    } catch (error) {
      // handle error
      response = error.response;
      if (response.status === 403) {
        removeKeyFromLocalStorage("token");
        removeKeyFromLocalStorage("name");
      }
      throw error;
    }
  }
);
export const deleteExpenseByIdTrunk = createAsyncThunk(
  "deleteExpenseById/api",
  async (dataExpenseByID) => {
    const { token, expenseId } = dataExpenseByID;
    let response = null;
    try {
      response = await deleteExpenseByID(token, expenseId);
      const { mssg } = response.data;
      return mssg;
    } catch (error) {
      // handle error
      response = error.response;
      console.log(response);
      if (response.status === 403) {
        removeKeyFromLocalStorage("token");
        removeKeyFromLocalStorage("name");
      }
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
    builder.addCase(getExpenseByIdTrunk.rejected, (state, action) => {
      // Add user to the state array
      state.status = action.error;
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
      state.docUpdateById = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateExpenseByIdTrunk.rejected, (state, action) => {
      // Add user to the state array
      state.status = action.error;
      state.loading = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteExpenseByIdTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteExpenseByIdTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.deleteDocUpdateById = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteExpenseByIdTrunk.rejected, (state, action) => {
      // Add user to the state array
      state.status = action.error;
      state.loading = false;
    });
  },
});

// export const {} = incomeDetailsSlice.actions

export default expenseDetailsSlice.reducer;
