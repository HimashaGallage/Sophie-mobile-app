import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CounterProps {
     quantity: number;
     increaseQuantity: () => void;
     decreaseQuantity: () => void;
}

const Counter: React.FC<CounterProps> = ({ quantity = 0, increaseQuantity, decreaseQuantity }) => {
     const theme = useTheme();
     const styles = createStyles(theme);

     const handleDecreaseQuantity = () => {
          decreaseQuantity();
     };

     const handleIncreaseQuantity = () => {
          increaseQuantity();
     };

     return (
          <View style={styles.container}>
               <View style={styles.quantityContainer}>
                    <Pressable
                         onPress={handleDecreaseQuantity}
                         style={[styles.quantityButton, styles.leftButton]}>
                         <Text style={styles.quantityButtonText}>-</Text>
                    </Pressable>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <Pressable
                         onPress={handleIncreaseQuantity}
                         style={[styles.quantityButton, styles.rightButton]}>
                         <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
               </View>
          </View>
     );
};

const createStyles = (theme: any) =>
     StyleSheet.create({
          container: {
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
          },
          quantityContainer: {
               flexDirection: 'row',
               alignItems: 'center',
               borderRadius: 12,
               overflow: 'hidden',
               paddingHorizontal: 5,
          },
          quantityButton: {
               backgroundColor: theme.Colors.primary,
               width: 30,
               height: 30,
               justifyContent: 'center',
               alignItems: 'center',
          },
          leftButton: {
               borderTopLeftRadius: 12,
               borderBottomLeftRadius: 12,
          },
          rightButton: {
               borderTopRightRadius: 12,
               borderBottomRightRadius: 12,
          },
          quantityButtonText: {
               color: theme.Colors.white,
               fontSize: 16,
          },
          quantityText: {
               width: 50,
               height: 30,
               justifyContent: 'center',
               alignItems: 'center',
               textAlign: 'center',
               fontSize: 16,
               lineHeight: 30,
          },
     });

export default Counter;
