import Realm from 'realm';
import { CartSchema, CartItemSchema } from './schemas/cartSchema';
import { UserSchema } from './schemas/userSchema';

const realmConfig = {
    schema: [UserSchema, CartSchema, CartItemSchema],
    schemaVersion: 8,
};

const realm = new Realm(realmConfig);

export default realm;