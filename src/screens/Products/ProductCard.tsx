import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import { Product } from '../../types';
import ProductImageSlider from './ProductImageSlider';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onLayout: (height: number) => void;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
    ({ product, onAddToCart, onLayout, onPress }) => {
        const theme = useTheme();
        const styles = createStyles(theme);

        const [showCheckmark, setShowCheckmark] = useState(false);

        // Handle adding product to cart
        const handleAddToCart = useCallback(() => {
            onAddToCart(product);
            showCheckmarkForDuration(1000); // Show checkmark for 1 second
        }, [onAddToCart, product]);

        // Utility function for showing checkmark briefly
        const showCheckmarkForDuration = (duration: number) => {
            setShowCheckmark(true);
            setTimeout(() => setShowCheckmark(false), duration);
        };

        return (
            <Pressable
                onPress={onPress}
                style={styles.card}
                onLayout={(event) => onLayout(event.nativeEvent.layout.height)}
            >
                {/* Product Image Slider */}
                <ProductImageSlider images={product.images} />

                {/* Product Details (Title and Price) */}
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                {/* Add to Cart Button with Checkmark */}
                <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
                    {showCheckmark ? (
                        <MaterialIcons name="check-circle" size={20} color={theme.Colors.secondary} />
                    ) : (
                        <MaterialIcons name="add-shopping-cart" size={18} color={theme.Colors.white} />
                    )}
                </Pressable>
            </Pressable>
        );
    },
    (prevProps, nextProps) => prevProps.product.id === nextProps.product.id
);

const createStyles = (theme: any) => StyleSheet.create({
    card: {
        backgroundColor: theme.Colors.white,
        padding: 8,
        paddingBottom: 24,
        borderRadius: 8,
        shadowColor: theme.Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        width: '48%',
        marginHorizontal: 4,
        marginVertical: 4,
        position: 'relative',
    },
    title: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: 'bold',
        color: theme.Colors.primary,
    },
    price: {
        fontSize: 12,
        marginBottom: 8,
        color: theme.Colors.primary,
    },
    addToCartButton: {
        backgroundColor: theme.Colors.primary,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 8,
        bottom: 8,
    },
});


export default ProductCard;