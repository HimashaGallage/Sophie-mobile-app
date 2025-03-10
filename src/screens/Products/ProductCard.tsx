import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types';
import ProductImageSlider from './ProductImageSlider';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
    ({ product, onAddToCart, onPress }) => {
        const theme = useTheme();
        const styles = createStyles(theme);

        const [showCheckmark, setShowCheckmark] = useState(false);

        // Utility function to show checkmark temporarily
        const showCheckmarkForDuration = useCallback((duration: number) => {
            setShowCheckmark(true);
            setTimeout(() => setShowCheckmark(false), duration);
        }, []);

        // Handle adding to cart
        const handleAddToCart = useCallback(() => {
            onAddToCart(product);
            showCheckmarkForDuration(1000);
        }, [onAddToCart, product, showCheckmarkForDuration]);

        return (
            <Pressable onPress={onPress} style={styles.card}>
                {/* Product Image Slider */}
                <ProductImageSlider images={product.images} />

                {/* Product Details Wrapper */}
                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={2}>
                        {product.title}
                    </Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                </View>

                {/* Floating Add to Cart Button */}
                <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
                    {showCheckmark ? (
                        <MaterialIcons name="check-circle" size={22} color={theme.Colors.secondary} />
                    ) : (
                        <MaterialIcons name="add-shopping-cart" size={22} color={theme.Colors.white} />
                    )}
                </Pressable>
            </Pressable>
        );
    },
    (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);

const createStyles = (theme: any) =>
    StyleSheet.create({
        card: {
            backgroundColor: theme.Colors.white,
            borderRadius: 8,
            shadowColor: theme.Colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            width: '48%',
            marginHorizontal: 4,
            marginVertical: 6,
            position: 'relative',
            overflow: 'hidden',
            paddingBottom: 10,
        },
        details: {
            padding: 10,
        },
        title: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.Colors.primary,
        },
        price: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.Colors.green,
            marginTop: 4,
        },
        addToCartButton: {
            backgroundColor: theme.Colors.primary,
            width: 60,
            height: 30, 
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
            bottom: 10,
        },
    });

export default ProductCard;