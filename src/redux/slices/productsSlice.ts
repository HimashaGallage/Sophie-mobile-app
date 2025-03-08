import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../services/productsService';
import { ProductsState } from '../../types';

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

// Create an async thunk for fetching products
export const getProducts = createAsyncThunk('products/getProducts',
    async ({ page, limit }: { page: number; limit: number }) => {
        const data = await fetchProducts(page, limit);
        return data.products;
    });

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProductsState: () => initialState,
      },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, ...action.payload];
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const { resetProductsState } = productsSlice.actions;
export default productsSlice.reducer;