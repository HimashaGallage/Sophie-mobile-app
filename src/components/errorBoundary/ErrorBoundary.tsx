import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useTheme } from '../../context/ThemeContext';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Woops!</Text>
      <Text style={styles.title}>Something went wrong</Text>
      <TouchableOpacity style={styles.button} onPress={resetErrorBoundary}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log("Resetting error state");
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.Colors.error,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: theme.Colors.white,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.Colors.error,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomErrorBoundary;