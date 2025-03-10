import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import cartThunk from '../../redux/thunks/cartThunk';
import { fetchProducts } from '../../services/productsService';
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
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const { data, isLoading, isError, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
        'products',
        ({ pageParam = 1 }) => fetchProducts(pageParam, 10),
        {
            getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined,
            staleTime: 5000,
            keepPreviousData: true,
        }
    );

    const handleLoadMore = useCallback(() => {
        if (!isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetching, hasNextPage, fetchNextPage]);

    const handleAddToCart = useCallback((product: Product) => {
        dispatch(cartThunk.addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.images[0],
        }));
    }, [dispatch]);

    const getProductQuantity = useMemo(() => {
        return (productId: number) => cartItems.find((item) => item.id === productId)?.quantity || 0;
    }, [cartItems]);

    const handleRenderItem = useCallback(({ item }: { item: Product }) => {
        return (
            <ProductCard
                product={item}
                onAddToCart={handleAddToCart}
                onPress={() => navigation.navigate('ProductDetail', { product: item, quantity: getProductQuantity(item.id) })}
            />
        );
    }, [handleAddToCart, getProductQuantity, navigation]);

    if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (isError) return <Text>Error fetching products</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.pages.flatMap(page => page.products) || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={handleRenderItem}
                numColumns={2}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isFetching ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                showsVerticalScrollIndicator={false}
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