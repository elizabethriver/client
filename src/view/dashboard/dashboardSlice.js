import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboard } from "../../api/api";
import { removeKeyFromLocalStorage } from "../../utils/utils";

const initialState = {
  incomeAllDashboardData: [],
  expenseAllDashboardData: [],
  loading: false,
  status: null
};
// First, create the thunk
export const incomeAllAxiosDashboard = createAsyncThunk(
  "incomeDashboardData/api",
  async (token) => {
    let response = null;
    try {
      response = await dashboard(token);
      const { incomeAll } = response.data;
      return incomeAll;
    } catch (error) {
      response = error.response;
      if (response.status === 403) {
        removeKeyFromLocalStorage('token')
        removeKeyFromLocalStorage('name')
      }
      throw error;
    }
  }
);

export const expensesAllAxiosDashboard = createAsyncThunk(
  "expenseDashboardData/api",
  async (token) => {
    let response = null;
    try {
      response = await dashboard(token);
      const { expensesAll } = response.data;
      return expensesAll;
    } catch (error) {
      response = error.response;
      if (response.status === 403) {
        removeKeyFromLocalStorage('token')
        removeKeyFromLocalStorage('name')
      }
      throw error;    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomeAllAxiosDashboard.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomeAllAxiosDashboard.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.incomeAllDashboardData = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomeAllAxiosDashboard.rejected, (state, action) => {
      // Add user to the state array
      state.status = action.error
      state.loading = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensesAllAxiosDashboard.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensesAllAxiosDashboard.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.expenseAllDashboardData = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensesAllAxiosDashboard.rejected, (state, action) => {
      // Add user to the state array
      state.status = action.error
      state.loading = false;
    });
  },
});

// export const {} = dashboardSlice.actions

export default dashboardSlice.reducer;
