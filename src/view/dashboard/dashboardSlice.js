import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboard } from "../../api/api";

const initialState = {
  incomeAllDashboardData: [],
  expenseAllDashboardData: [],
  loadingIncome: false,
  loadingExpense: false,

};
// First, create the thunk
export const incomeAllAxiosDashboard = createAsyncThunk(
  "incomeDashboardData/api",
  async (token) => {
    try {
      const response = await dashboard(token);
      const { incomeAll } = response.data;
      return incomeAll;
    } catch (error) {
      throw error;
    }
  }
);

export const expensesAllAxiosDashboard = createAsyncThunk(
  "expenseDashboardData/api",
  async (token) => {
    try {
      const response = await dashboard(token);
      const { expensesAll } = response.data;
      return expensesAll;
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
    builder.addCase(incomeAllAxiosDashboard.pending, (state) => {
      // Add user to the state array
      state.loadingIncome = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomeAllAxiosDashboard.fulfilled, (state, action) => {
      // Add user to the state array
      state.loadingIncome = false;
      state.incomeAllDashboardData = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomeAllAxiosDashboard.rejected, (state) => {
      // Add user to the state array
      state.loadingIncome = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensesAllAxiosDashboard.pending, (state) => {
      // Add user to the state array
      state.loadingExpense = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensesAllAxiosDashboard.fulfilled, (state, action) => {
      // Add user to the state array
      state.loadingExpense = false;
      state.expenseAllDashboardData = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(expensesAllAxiosDashboard.rejected, (state) => {
      // Add user to the state array
      state.loadingExpense = false;
    });
  },
});

// export const {} = dashboardSlice.actions

export default dashboardSlice.reducer;
