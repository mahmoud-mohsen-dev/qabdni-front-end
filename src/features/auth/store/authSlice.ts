import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: true,
    user: null,
    companyDetails: null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    signup: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated ?? false;
      state.user = action.payload.user ?? null;
      state.companyDetails = action.payload.companyDetails ?? null;
    }
  }
});

export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
