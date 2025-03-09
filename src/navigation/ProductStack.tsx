import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import ProductListScreen from '../screens/Products/ProductListScreen';
import ProductDetailScreen from '../screens/Products/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const ProductStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProductList"
                component={ProductListScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: theme.Colors.primary,
                    headerShadowVisible: false
                }} />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: theme.Colors.primary,
                    headerShadowVisible: false
                }} />
        </Stack.Navigator>
    );
};

export default ProductStack;