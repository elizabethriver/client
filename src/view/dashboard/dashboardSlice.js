import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboard } from "./../../api/api";

const initialState = {
  dashboardData: {},
  loading: false,
};
// First, create the thunk
export const axiosDashboard = createAsyncThunk(
  "dashboard/api",
  async (token) => {
    try {
      const response = await dashboard(token);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(axiosDashboard.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(axiosDashboard.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.dashboardData = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(axiosDashboard.rejected, (state) => {
      // Add user to the state array
      state.loading = false;
    });
  },
});

// export const {} = dashboardSlice.actions

export default dashboardSlice.reducer;
