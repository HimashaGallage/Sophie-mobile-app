import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CustomLinkProps } from '../types';

const CustomLink = ({ title, onPress }: CustomLinkProps) => {
     const theme = useTheme();
     const styles = createStyles(theme);

     return (
          <Pressable onPress={onPress} style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}>
               <Text style={styles.linkText}>{title}</Text>
          </Pressable>
     );
};

const createStyles = (theme: any) => StyleSheet.create({
     link: {
          padding: 10
     },
     linkPressed: {
          opacity: 0.7,
     },
     linkText: {
          color: theme.Colors.primary,
          fontSize: 16,
     }
});

export default CustomLink;