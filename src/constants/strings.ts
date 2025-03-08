export const auth_flow = {
     app_name: "Sophie",
     slogan: "where shopping meets convenience, and style finds you.",
     good_to_see: 'Good to see you back!',
     login: "Sign in",
     logout: 'log out',
     update_profile: 'Update Profile',
     signup: 'Sign Up',
     create_account: "create a new account",
     no_account: `Don't have an account?`,
     already_have_account: 'Already have an account',
     username: 'Username',
     password: 'Password',
     forgot_password: 'Forgot Password?'
};

export const bottom_tabs = {
     home: "Home",
     products: "Shop",
     categories: 'Categories',
     cart: "Cart",
     me: "Profile",
};

export const shop_screen = {
     add_to_cart: 'Add to Cart'
}

export const home_screen = {
     my_activity: 'My Activity',
     hello_user: 'Hello, Romina!',
     announcements: 'Announcement',
     announcement_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit luctus libero ac vulputate.adipiscing elit. Maecenas hendrerit luctu.',
     recently_viewed: 'Recently viewed',
     my_orders: 'My Orders',
     to_pay: 'To pay',
     to_receive: 'To receive',
     to_review: 'To review',
     stories: 'Stories'
}

export const categories_screen = {
     categories: "Categories"

}

export const cart_screen = {
     cart: "Cart",
     chekcout: 'Checkout',
     total: 'Total Cost: $',
     empty_cart: 'Your cart is empty.'

}

export const product_detail_screen = {
     no_image: 'No images available'
}

export const checkout_screen = {
     confirm_order: "Confirm Order",
     payment_method: 'Payment method',
     shipping_options: 'Shipping Options',
     shipping_details: 'Shipping details',
     order_summary: "Order summary ",
     retail_price: "Retail Price ",
     shipping_fee: "Shipping Fee ",
     shipping_guarantee: "Shipping Guarantee ",
     order_total: "Order Total ",
}

export type HomeScreenKeys = keyof typeof home_screen;