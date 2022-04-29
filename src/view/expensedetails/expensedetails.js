import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIncomeByID } from "../../api/api";
const initialState = {
  dataIncomeById: [],
  loading: false,
};

export const getIncomeByIdTrunk = createAsyncThunk(
  async (dataIncomeByID) => {
    const { token, incomeId } = dataIncomeByID;
    try {
      const response = await getIncomeByID(token, incomeId);
      const {findedObject} = response
      return findedObject;
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
  },
});

// export const {} = incomeDetailsSlice.actions

export default incomeDetailsSlice.reducer;