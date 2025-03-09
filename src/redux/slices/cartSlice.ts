import { createSlice } from '@reduxjs/toolkit';
import cartThunk from '../thunks/cartThunk';
import { CartItem } from '../../types';

interface CartState {
    cartItems: CartItem[]; 
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(cartThunk.loadCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            })
            .addCase(cartThunk.addToCart.fulfilled, (state, action) => {
                const existingItem = state.cartItems.find(item => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.cartItems.push({ ...action.payload, quantity: 1 });
                }
            })
            .addCase(cartThunk.removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            })
            .addCase(cartThunk.clearCart.fulfilled, (state) => {
                state.cartItems = [];
            })
            .addCase(cartThunk.updateQuantity.fulfilled, (state, action) => {
                const existingItem = state.cartItems.find(item => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity = action.payload.quantity;
                }
            });
    },
});

export default cartSlice.reducer;
