import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import cartThunk from '../../redux/thunks/cartThunk';
import { Navigation } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { cart_screen } from '../../constants/strings';
import Counter from '../../components/Counter';

type Props = {
    navigation: Navigation;
};

const CartScreen = ({ navigation }: Props) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const dispatch = useDispatch<AppDispatch>();

    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const userId = useSelector((state: RootState) => state.auth.user?.id);

    const [totalCost, setTotalCost] = useState('0.00');

    useEffect(() => {
        if (userId) {
            dispatch(cartThunk.loadCartItems());
        }
    }, [dispatch, userId]);

    useEffect(() => {
        const totalValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        setTotalCost(totalValue);
    }, [cartItems]);

    const handleRemoveFromCart = (id: number) => {
        if (userId) {
            dispatch(cartThunk.removeFromCart(id));
        }
    };

    const handleIncreaseQuantity = (id: number) => {
        const existingItem = cartItems.find(item => item.id === id);
        if (existingItem) {
            dispatch(cartThunk.updateQuantity({ id, quantity: existingItem.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (id: number) => {
        const existingItem = cartItems.find(item => item.id === id);
        if (existingItem && existingItem.quantity > 1) {
            dispatch(cartThunk.updateQuantity({ id, quantity: existingItem.quantity - 1 }));
        } else {
            handleRemoveFromCart(id);
        }
    };

    const handleCheckout = () => {
        navigation.navigate('Checkout', { totalCost });
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <Counter
                quantity={item.quantity}
                increaseQuantity={() => handleIncreaseQuantity(item.id)}
                decreaseQuantity={() => handleDecreaseQuantity(item.id)}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{cart_screen.cart}</Text>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyMessage}>{cart_screen.empty_cart}</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
            {totalCost !== '0.00' && (
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>{`${cart_screen.total} ${totalCost}`}</Text>
                    <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
                        <Text style={styles.checkoutButtonText}>{cart_screen.chekcout}</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 100,
        backgroundColor: theme.Colors.white,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: theme.Colors.primary,
    },
    emptyMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    productItem: {
        backgroundColor: theme.Colors.white,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: theme.Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 14,
        color: theme.Colors.primary,
    },
    productPrice: {
        fontWeight: 'bold',
        color: theme.Colors.primary,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 32,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.Colors.primary,
    },
    checkoutButton: {
        backgroundColor: theme.Colors.secondary,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 'auto',
    },
    checkoutButtonText: {
        color: theme.Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default CartScreen;
