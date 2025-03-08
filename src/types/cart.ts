export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Cart {
    id: number;
    items: CartItem[];
}