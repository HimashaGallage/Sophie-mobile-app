import Toast from 'react-native-toast-message';

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'default' = 'info') => {
  Toast.show({
    text1: message,
    type: type,
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onHide: () => {},
  });
};