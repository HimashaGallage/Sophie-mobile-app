import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import realm from '../realm/realmConfig'; 
import { clearUser, setUser } from '../redux/slices/authSlice';
import store from '../redux/store';
import { LoginCredentials } from '../types';
import API_URL from '../config';

// Define the login thunk
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL.LOGIN, {
        username: 'user',
        password: 'password',
      });

      const userData = response.data;

      // Securely store the token using Keychain
      await Keychain.setGenericPassword(userData.id.toString(), userData.token);

      // Open Realm and save user data (excluding the token)
      realm.write(() => {
        const existingUser = realm.objects('User').filtered(`id == ${userData.id}`)[0];
        if (existingUser) {
          // Update existing user if found
          existingUser.username = userData.username;
          existingUser.email = userData.email || '';
        } else {
          // Create a new user if not found
          realm.create('User', {
            id: userData.id,
            username: userData.username,
            email: userData.email || '',
          });
        }
      });

      // Dispatch the user details to the Redux store to trigger the cart load
      store.dispatch(setUser({
        id: userData.id,
        username: userData.username,
        email: userData.email || '',
      }));

      // Return user details without token
      return {
        id: userData.id,
        username: userData.username,
        email: userData.email || '',
      };
    } catch (error: any) {
      // Handle any errors that occur during the login process
      console.error('Login failed:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Remove stored credentials
      await Keychain.resetGenericPassword();

      // Delete user data from Realm
      realm.write(() => {
        const allUsers = realm.objects('User');
        realm.delete(allUsers); // Remove all user records
      });

      // Clear user state in Redux
      dispatch(clearUser());

      return true;
    } catch (error: any) {
      console.error('Logout failed:', error);
      return rejectWithValue(error.message);
    }
  }
);