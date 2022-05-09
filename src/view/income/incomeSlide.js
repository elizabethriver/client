import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { incomePost } from "../../api/api";

const initialState = {
  dataIncome: [],
  loading: false,
  status: null
};

export const incomePostTrunk = createAsyncThunk(
  "incomePost/api",
  async (dataIncome) => {
    const { token, product, income } = dataIncome;
    let response = null;

    try {
      response = await incomePost(token, product, income);
      console.log(response);
      return response.data;
    } catch (error) {
      // handle error
      response = error.response;
      console.log(response);
      throw error;
    }
  }
);

const incomeSlide = createSlice({
  name: "dataIncome",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomePostTrunk.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomePostTrunk.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.dataIncome = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(incomePostTrunk.rejected, (state, action) => {
      // Add user to the state array
      state.status = action.error
      state.loading = false;
    });
  },
});

// export const {} = incomeSlide.actions;

export default incomeSlide.reducer;
