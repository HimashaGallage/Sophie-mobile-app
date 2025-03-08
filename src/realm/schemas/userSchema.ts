import { ObjectSchema } from "realm";

export const UserSchema: ObjectSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'int',
        username: 'string',
        email: 'string',
        cart: 'Cart?',
    }
};
