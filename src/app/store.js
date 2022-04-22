import { configureStore } from '@reduxjs/toolkit';
import  loginslide from './../view/login/loginslide';

export const store = configureStore({
  reducer: {
    login: loginslide
  },
});
