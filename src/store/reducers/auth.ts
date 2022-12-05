/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

interface LoginState {
  isAuth: boolean;
}

const initialState: LoginState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    doLogin: state => {
      state.isAuth = true;
    },
    doLogout: state => {
      state.isAuth = false;
    },
  },
});

export const {doLogin, doLogout} = authSlice.actions;

export default authSlice.reducer;
