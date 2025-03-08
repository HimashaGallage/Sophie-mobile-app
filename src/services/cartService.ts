import realm from '../realm/realmConfig';
import { Cart, CartItem } from '../types';

// Get or create cart for user
export const getUserCart = (userId: number): Cart => {
    let cart = realm.objectForPrimaryKey('Cart', userId) as Cart;

    if (!cart) {
        realm.write(() => {
            cart = realm.create('Cart', {
                id: userId, // User ID as cart ID
                items: [],
            });
        });}
    return cart;
};

// Add item to user's cart
export const addItemToCart = (userId: number, cartItem: CartItem) => {
    realm.write(() => {
        const cart = getUserCart(userId); 
        const existingItem = cart.items.find((item: CartItem) => item.id === cartItem.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ ...cartItem, quantity: 1 });
        }
    });
};

// Remove item from cart
export const removeItemFromCart = (userId: number, itemId: number) => {
    realm.write(() => {
        const cart = getUserCart(userId);
        cart.items = cart.items.filter((item: CartItem) => item.id !== itemId);
    });
};

// Update item quantity
export const updateItemQuantity = (userId: number, itemId: number, quantity: number) => {
    realm.write(() => {
        const cart = getUserCart(userId);
        const item = cart.items.find((item: CartItem) => item.id === itemId);
        if (item) {
            item.quantity = quantity;
        }
    });
};

// Clear cart
export const clearCart = (userId: number) => {
    realm.write(() => {
        const cart = getUserCart(userId);
        cart.items = [];
    });
};

// Get all cart items
export const getCartItems = (userId: number): CartItem[] => {
    const cart = getUserCart(userId);
    return cart.items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
    }));
};