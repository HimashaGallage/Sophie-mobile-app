import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from '../../types';
import cartService from '../../services/cartService';
import { RootState } from '../store';

const loadCartItems = createAsyncThunk(
    'cart/loadCartItems',
    (_, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        const cartItems = cartService.getCartItems(userId);
        return cartItems;
    }
);

// Add item to cart using userId from the state
const addToCart = createAsyncThunk(
    'cart/addToCart',
    (cartItem: CartItem, { getState }) => {
        const state = getState() as RootState;

        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        cartService.addItemToCart(userId, cartItem); // Save to Realm

        return cartItem; // Return the item for Redux state update
    }
);

// Remove item from cart
const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    (itemId: number, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        // Remove from Realm
        cartService.removeItemFromCart(userId, itemId); 
        return itemId; // Return the item ID to update the Redux state
    }
);

// Clear the entire cart
const clearCart = createAsyncThunk(
    'cart/clearCart',
    (userId: number) => {
        // Clear cart in Realm
         cartService.clearCart(userId); 
    }
);

// Update item quantity
const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    (payload: { id: number; quantity: number }, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.user?.id;
        if (!userId) throw new Error('User not logged in');
        
        // Update in Realm
        cartService.updateItemQuantity(userId, payload.id, payload.quantity);

        return payload; // Return the updated payload
    }
);

const cartThunk = {
    loadCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
};

export default cartThunk;
