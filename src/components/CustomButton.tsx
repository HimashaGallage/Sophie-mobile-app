import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomButtonProps } from '../types';

const CustomButton = ({ title, onPress }: CustomButtonProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  button: {
    backgroundColor: theme.Colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: theme.Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;