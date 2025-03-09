import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import realm from '../realm/realmConfig';
import API_URL from '../config';
import { LoginCredentials } from '../types';

export const loginUser = async ({ username, password }: LoginCredentials) => {
  try {
    const response = await axios.post(API_URL.LOGIN, {
      username,
      password,
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

    return {
      id: userData.id,
      username: userData.username,
      email: userData.email || '',
    };
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

export const logoutUser = async () => {
  try {
    // Remove stored credentials
    await Keychain.resetGenericPassword();

    // Delete user data from Realm
    realm.write(() => {
      const allUsers = realm.objects('User');
      realm.delete(allUsers);
    });
  } catch (error: any) {
    throw error.message;
  }
};
