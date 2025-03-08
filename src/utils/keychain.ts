import * as Keychain from 'react-native-keychain';

export const saveCredentials = async (username: string, password: string) => {
  await Keychain.setGenericPassword(username, password);
};

export const getCredentials = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return credentials;
  }
  return null;
};

export const deleteCredentials = async () => {
  await Keychain.resetGenericPassword();
};