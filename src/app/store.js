import { configureStore } from '@reduxjs/toolkit';
import  loginslide from './../view/login/loginslide.js';
import registerSlice from '../view/register/registerSlice.js';
import dashboardSlice from '../view/dashboard/dashboardSlice.js';
import incomeDetailsSlice from '../view/incomedetails/incomeDetailsSlice.js';

export const store = configureStore({
  reducer: {
    login: loginslide,
    register: registerSlice,
    dataDashboard: dashboardSlice,
    getIncomeByID: incomeDetailsSlice
  },
});
