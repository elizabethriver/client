import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIncomeByID, putIncomeByID } from "../../api/api";
const initialState = {
  dataIncomeById: [],
  loading: false,
  docUpdateById: [],
};

export const getIncomeByIdTrunk = createAsyncThunk(
  "getIncomeById/api",
  async (dataIncomeByID) => {
    const { token, incomeId } = dataIncomeByID;
    try {
      const response = await getIncomeByID(token, incomeId);
      const { findedObject } = response;
      return findedObject;
    } catch (error) {
      throw error;
    }
  }
);

export const updateIncomeByIdTrunk = createAsyncThunk(
  "updateIncomeByIdTrunk/api",
  async (dataIncomeByID) => {
    const { token, product, income, incomeId } = dataIncomeByID;
    try {
      const response = await putIncomeByID(token, product, income, incomeId);
      console.log(response.data);
      const { docUpdate } = response.data;
      return docUpdate;
    } catch (error) {
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
    builder.addCase(getIncomeByIdTrunk.rejected, (state) => {
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
  },
});

// export const {} = incomeDetailsSlice.actions

export default incomeDetailsSlice.reducer;
