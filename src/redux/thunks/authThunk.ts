import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, clearUser } from '../../redux/slices/authSlice';
import store from '../../redux/store';
import { loginUser, logoutUser } from '../../services/authService';
import { LoginCredentials } from '../../types';

// Login action
const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const user = await loginUser({ username, password });

      // Dispatch the user details to the Redux store
      store.dispatch(setUser(user));

      // Return user details without the token
      return user;
    } catch (error: any) {
      console.error('Login failed:', error);
      return rejectWithValue(error);
    }
  }
);

// Logout action
const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logoutUser();

      // Clear user state in Redux
      dispatch(clearUser());

      return true;
    } catch (error: any) {
      console.error('Logout failed:', error);
      return rejectWithValue(error);
    }
  }
);

const authThunk = {
  login,
  logout,
};

export default authThunk;
