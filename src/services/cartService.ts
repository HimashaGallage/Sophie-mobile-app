import realm from '../realm/realmConfig';
import { Cart, CartItem } from '../types';

const cartService = {
    // Get or create cart for user
    getUserCart: (userId: number): Cart => {
        let cart = realm.objectForPrimaryKey('Cart', userId) as Cart;

        if (!cart) {
            realm.write(() => {
                cart = realm.create('Cart', {
                    id: userId, // User ID as cart ID
                    items: [],
                });
            });
        }
        return cart;
    },

    // Add item to user's cart
    addItemToCart: (userId: number, cartItem: CartItem) => {
        realm.write(() => {
            const cart = cartService.getUserCart(userId);
            const existingItem = cart.items.find((item: CartItem) => item.id === cartItem.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ ...cartItem, quantity: 1 });
            }
        });
    },

    // Remove item from cart
    removeItemFromCart: (userId: number, itemId: number) => {
        realm.write(() => {
            const cart = cartService.getUserCart(userId);
            cart.items = cart.items.filter((item: CartItem) => item.id !== itemId);
        });
    },

    // Update item quantity
    updateItemQuantity: (userId: number, itemId: number, quantity: number) => {
        realm.write(() => {
            const cart = cartService.getUserCart(userId);
            const item = cart.items.find((item: CartItem) => item.id === itemId);
            if (item) {
                item.quantity = quantity;
            }
        });
    },

    // Clear cart
    clearCart: (userId: number) => {
        realm.write(() => {
            const cart = cartService.getUserCart(userId);
            cart.items = [];
        });
    },

    // Get all cart items
    getCartItems: (userId: number): CartItem[] => {
        const cart = cartService.getUserCart(userId);
        return cart.items.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
        }));
    }
};

export default cartService;