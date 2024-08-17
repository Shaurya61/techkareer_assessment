import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/authSlice';
import chatReducer from './store/chatSlice'

const initialState = {
  auth: {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
    
  },
  preloadedState: initialState, // Load initial state from localStorage
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
