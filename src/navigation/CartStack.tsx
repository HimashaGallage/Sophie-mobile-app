import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import CartScreen from '../screens/Cart/CartScreen';
import CheckoutScreen from '../screens/Cart/ChekoutScreen';

const Stack = createNativeStackNavigator();

const CartStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: theme.Colors.white,
                    }
                }} />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: theme.Colors.primary,
                    headerShadowVisible: false
                }} />

        </Stack.Navigator>
    );
};

export default CartStack;