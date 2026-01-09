import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  privacyPolicyAccepted: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.privacyPolicyAccepted = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Notify other tabs
      localStorage.setItem('logout', Date.now().toString());
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPrivacyPolicyAccepted: (state, action) => {
      state.privacyPolicyAccepted = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser, setPrivacyPolicyAccepted } = authSlice.actions;
export default authSlice.reducer;