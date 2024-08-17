// src/store/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ChatState {
  selectedUser: User | null;
}

const initialState: ChatState = {
  selectedUser: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
