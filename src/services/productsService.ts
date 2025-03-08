import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import API_URL from '../config';
import { showToast } from '../utils/toast';

export const fetchProducts = async (page: number, limit: number) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) {
      showToast('No token found in Keychain.', 'error');
      throw new Error('No token found in Keychain');
    }
    const token = credentials.password; 

    const response = await axios.get(`${API_URL.PRODUCTS}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        showToast('Network error: Please check your internet connection.', 'error');
        throw new Error('Network error: Please check your internet connection.');
      } else {
        showToast(`Server error: ${error.response.status} - ${error.response.data}`, 'error');
        throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
      }
    } else {
      console.error('Error fetching products:', error);
      showToast('An unexpected error occurred.', 'error');
      throw error;
    }
  }
};