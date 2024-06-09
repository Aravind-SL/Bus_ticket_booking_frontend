import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '@/stores';

interface UserState {
  username?: string,
  isAuthenticated: boolean
};

const initialState: UserState = {
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    unSetUser: (state) => {
      delete state.username;
      state.isAuthenticated = false;
    },

    setUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isAuthenticated = true;
    },
  }
});

export const {setUser, unSetUser} = authSlice.actions;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectisAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
