import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}
const token = localStorage.getItem('token');
const initialState: AuthState = {
  isAuthenticated: false,
  token: token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action to handle login and store token in state.
     * @param {Object} state - Current state.
     * @param {Object} action - Action object containing token.
     */
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    /**
     * Action to handle logout and clear token from state.
     * @param {Object} state - Current state.
     */
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
