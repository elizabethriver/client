import { configureStore } from '@reduxjs/toolkit';
import  loginslide from './../view/login/loginslide';
import registerSlice from '../view/register/registerSlice';

export const store = configureStore({
  reducer: {
    login: loginslide,
    register: registerSlice,

  },
});
