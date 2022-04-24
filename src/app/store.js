import { configureStore } from '@reduxjs/toolkit';
import  loginslide from './../view/login/loginslide.js';
import registerSlice from '../view/register/registerSlice.js';

export const store = configureStore({
  reducer: {
    login: loginslide,
    register: registerSlice,

  },
});
