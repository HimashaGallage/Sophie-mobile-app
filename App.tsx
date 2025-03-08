import React from 'react';
import { View, StyleSheet, LogBox } from "react-native";
import Toast from 'react-native-toast-message';
import AuthStack from './src/navigation/AuthStack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import CustomErrorBoundary from './src/components/ErrorBoundary';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <CustomErrorBoundary>
          <View style={styles.container}>
            <AuthStack />
            <Toast /> 
          </View>
        </CustomErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
