import React from 'react';
import { View, StyleSheet, LogBox } from "react-native";
import Toast from 'react-native-toast-message';
import AuthStack from './src/navigation/AuthStack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import CustomErrorBoundary from './src/components/errorBoundary/ErrorBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CustomErrorBoundary>
            <View style={styles.container}>
              <AuthStack />
              <Toast /> 
            </View>
          </CustomErrorBoundary>
        </QueryClientProvider>
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