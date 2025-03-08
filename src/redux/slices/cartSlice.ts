import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from '../../types';
import * as cartService from '../../services/cartService';
import { RootState } from '../store';

// Thunks for cart actions

// Load cart items with userId accessed from the state
export const loadCartItems = createAsyncThunk(
    'cart/loadCartItems',
    async (_, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        const cartItems = await cartService.getCartItems(userId);
        return cartItems;
    }
);

// Add item to cart using userId from the state
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (cartItem: CartItem, { getState }) => {
        const state = getState() as RootState;

        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        await cartService.addItemToCart(userId, cartItem); // Save to Realm

        return cartItem; // Return the item for Redux state update
    }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (itemId: number, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        // Remove from Realm
        await cartService.removeItemFromCart(userId, itemId); 
        return itemId; // Return the item ID to update the Redux state
    }
);

// Clear the entire cart
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    (userId: number) => {
        // Clear cart in Realm
         cartService.clearCart(userId); 
    }
);

// Update item quantity
export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async (payload: { id: number; quantity: number }, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        // Update in Realm
        await cartService.updateItemQuantity(userId, payload.id, payload.quantity);

        return payload; // Return the updated payload
    }
);

// Cart state
interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Optional: Local actions that don't need userId
    },
    extraReducers: (builder) => {
        builder
            // Handle loadCartItems action
            .addCase(loadCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            })
            // Handle addToCart action
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingItem = state.cartItems.find(item => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.cartItems.push({ ...action.payload, quantity: 1 });
                }
            })
            // Handle removeFromCart action
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            })
            // Handle clearCart action
            .addCase(clearCart.fulfilled, (state) => {
                state.cartItems = [];
            })
            // Handle updateQuantity action
            .addCase(updateQuantity.fulfilled, (state, action) => {
                const existingItem = state.cartItems.find(item => item.id === action.payload.id);
                if (existingItem) {
                    existingItem.quantity = action.payload.quantity;
                }
            });
    },
});

export default cartSlice.reducer;