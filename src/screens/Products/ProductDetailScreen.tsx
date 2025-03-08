import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, RouteProp } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useTheme } from '../../context/ThemeContext';
import { product_detail_screen, shop_screen } from '../../constants/strings';
import { addToCart, removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { Product } from '../../types';
import CustomButton from '../../components/CustomButton';
import Counter from '../../components/Counter';

type ProductDetailRouteParams = {
    product: Product;
    quantity: number;
};

const ProductDetailScreen = () => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const route = useRoute<RouteProp<Record<string, ProductDetailRouteParams>, string>>();
    const dispatch = useDispatch<AppDispatch>();

    const params = route.params;
    if (!params || !params.product) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Product not found.</Text>
            </View>
        );
    }

    const { product } = params;

    const cartItem = useSelector((state: RootState) =>
        state.cart.cartItems.find((item) => item.id === product.id)
    );

    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = useCallback(() => {
        dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1, image: product.images[0] }));
    }, [dispatch, product, quantity]);

    const handleIncreaseQuantity = useCallback(() => {
        if (product?.id) {
            dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
        }
    }, [dispatch, product?.id, quantity]);

    const handleDecreaseQuantity = useCallback(() => {
        if (product?.id) {
            if (quantity > 1) {
                dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
            } else {
                dispatch(removeFromCart(product.id));
            }
        }
    }, [dispatch, product?.id, quantity]);

    return (
        <ScrollView style={styles.container}>
            <Swiper style={styles.swiper} loop autoplay activeDotColor={theme.Colors.primary}>
                {product.images?.length ? (
                    product.images.map((image, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                        </View>
                    ))
                ) : (
                    <View style={styles.imageContainer}>
                        <Text style={styles.errorText}>{product_detail_screen.no_image}</Text>
                    </View>
                )}
            </Swiper>

            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.category}>{product.category?.name || ''}</Text>
            <Text style={styles.description}>{product.description}</Text>

            {quantity && quantity > 0 ? (
                <Counter quantity={quantity}
                    increaseQuantity={handleIncreaseQuantity}
                    decreaseQuantity={handleDecreaseQuantity} />
            ) : (
                <CustomButton title={shop_screen.add_to_cart} onPress={handleAddToCart} />
            )}
        </ScrollView>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.Colors.white,
        },
        swiper: {
            height: 250,
            marginBottom: 16,
        },
        imageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: '100%',
            height: '100%',
            borderRadius: 8,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginVertical: 8,
        },
        price: {
            fontSize: 18,
            color: '#3b5998',
            marginVertical: 8,
        },
        category: {
            fontSize: 14,
            color: theme.Colors.inpu_grey,
            marginVertical: 8,
        },
        description: {
            fontSize: 14,
            color: theme.Colors.primary,
            marginVertical: 16,
            textAlign: 'justify',
        },
        addToCartButton: {
            backgroundColor: theme.Colors.primary,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 10,
        },
        addToCartButtonText: {
            color: theme.Colors.white,
            fontWeight: 'bold',
        },
        errorText: {
            fontSize: 18,
            color: 'red',
            textAlign: 'center',
            marginVertical: 20,
        },
    });

export default ProductDetailScreen;