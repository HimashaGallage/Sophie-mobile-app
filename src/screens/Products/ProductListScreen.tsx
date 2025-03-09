import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/slices/productsSlice';
import cartThunk from '../../redux/thunks/cartThunk';
import { RootState, AppDispatch } from '../../redux/store';
import { useTheme } from '../../context/ThemeContext';
import { Navigation, Product } from '../../types';
import ProductCard from './ProductCard';

type Props = {
    navigation: Navigation;
};

const ProductListScreen = ({ navigation }: Props) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    
    const dispatch = useDispatch<AppDispatch>();
    
    const { products, loading, error } = useSelector((state: RootState) => state.products);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [itemHeights, setItemHeights] = useState<number[]>([]);

    useEffect(() => {
        dispatch(getProducts({ page: 1, limit: 10 }));
    }, [dispatch]);

    const handleLoadMore = useCallback(() => {
        if (isFetchingMore || loading) return;

        setIsFetchingMore(true);
        const nextPage = page + 1;

        dispatch(getProducts({ page: nextPage, limit: 10 })).then(() => {
            setPage(nextPage);
            setIsFetchingMore(false);
        }).catch(() => {
            setIsFetchingMore(false);
        });
    }, [dispatch, isFetchingMore, loading, page]);

    const handleAddToCart = useCallback((product: Product) => {
        dispatch(cartThunk.addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1, image: product.images[0] }));
    }, [dispatch]);

    const getProductQuantity = useMemo(() => {
        return (productId: number) => cartItems.find((item) => item.id === productId)?.quantity || 0;
    }, [cartItems]);

    const handleRenderItem = useCallback(({ item, index }: { item: Product; index: number }) => {
        const handleProductCardPress = () => {
            navigation.navigate('ProductDetail', { product: item, quantity: getProductQuantity(item.id) });
        };
    
        return (
            <ProductCard
                product={item}
                onAddToCart={handleAddToCart}
                onLayout={(height) => {
                    setItemHeights((prevHeights) => {
                        const newHeights = [...prevHeights];
                        newHeights[index] = height;
                        return newHeights;
                    });
                }}
                onPress={handleProductCardPress}
            />
        );
    }, [handleAddToCart, getProductQuantity, navigation]);

    if (loading && products.length === 0) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item, index) => `${item.id}:${index}`}
                renderItem={handleRenderItem}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={5}
                numColumns={2}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={50}
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                showsVerticalScrollIndicator={false}
                getItemLayout={(_data, index) => ({
                    length: itemHeights[index] || 200,
                    offset: (itemHeights[index] || 200) * index,
                    index,
                })}
            />
        </View>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: theme.Colors.white,
        },
    });

export default ProductListScreen;