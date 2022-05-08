import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIncomeByID, putIncomeByID, deleteIncomeByID } from "../../api/api";
const initialState = {
  dataIncomeById: [],
  loading: false,
  docUpdateById: [],
  deleteDocUpdateById: [],
};

export const getIncomeByIdTrunk = createAsyncThunk(
  "getIncomeById/api",
  async (dataIncomeByID) => {
    const { token, incomeId } = dataIncomeByID;
    let response = null;

    try {
      response = await getIncomeByID(token, incomeId);
      const { findedObject } = response;
      return findedObject;
    } catch (error) {
      // handle error
      response = error.response;
      console.log(response);
      throw error;
    }
  }
);
export const deleteIncomeByIdTrunk = createAsyncThunk(
  "deleteIncomeById/api",
  async (dataIncomeByID) => {
    const { token, incomeId } = dataIncomeByID;
    let response = null;

    try {
      const response = await deleteIncomeByID(token, incomeId);
      const { mssg } = response.data;
      return mssg;
    } catch (error) {
      response = error.response;
      console.log(response);
      throw error;
    }
  }
);
export const updateIncomeByIdTrunk = createAsyncThunk(
  "updateIncomeByIdTrunk/api",
  async (dataIncomeByID) => {
    const { token, product, income, incomeId } = dataIncomeByID;
    let response = null;

    try {
      response = await putIncomeByID(token, product, income, incomeId);
      console.log(response.data);
      const { docUpdate } = response.data;
      return docUpdate;
    } catch (error) {
      // handle error
      response = error.response;
      console.log(response);
      throw error;
    }
  }
);

const incomeDetailsSlice = createSlice({
  name: "getIncomeByIdTrunk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getIncomeByIdTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getIncomeByIdTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.dataIncomeById = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getIncomeByIdTrunk.rejected, (state, action) => {
      // Add user to the state array
      state.loading = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateIncomeByIdTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateIncomeByIdTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.docUpdateById = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(updateIncomeByIdTrunk.rejected, (state) => {
      // Add user to the state array
      state.loading = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteIncomeByIdTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteIncomeByIdTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload);
      state.deleteDocUpdateById = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(deleteIncomeByIdTrunk.rejected, (state) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});

// export const {} = incomeDetailsSlice.actions

export default incomeDetailsSlice.reducer;
