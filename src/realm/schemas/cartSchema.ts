import { ObjectSchema } from 'realm';

export const CartSchema: ObjectSchema = {
    name: 'Cart',
    primaryKey: 'id',
    properties: {
        id: 'int',
        items: 'CartItem[]',
    },
};

export const CartItemSchema: ObjectSchema = {
    name: 'CartItem',
    properties: {
        id: 'int',
        title: 'string',
        price: 'float',
        quantity: 'int',
        image: 'string',
    },
};