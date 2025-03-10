# Sophie - shopping app

## Overview
Sophie Shopping App is a simple e-commerce platform built with React Native and TypeScript. It features a smooth shopping flow, allowing users to browse products, add to cart, and complete purchases easily.

## Features
- **Login Screen**
1. Provides basic login functionality users can input their username and password. It fetches data from a mock API for user authentication. Upon successful login, users are redirected to the home. If the credentials are incorrect, an error message is shown.
3. Demonstrate the use of **JWT** for token validation and save it in the **Keychain**. fetch later to use on other API calls.
4. Afetr succesful login store user data in **Realm database** and **redux toolkit store** for state management.
 
- **Shop Screen**
1. Fetches products from a mock API.
2. Use **React query** to fecth and cache data. Displaying product name, images, price of products.
3. Use **useInfiniteQuery** **useMemo** for easy browsing.

- **Product Details Screen**
1. Provides detail view of a product with addd to cart.
2. Use **redux toolkit store** , **React thunk** , **Realm database** to store cart data temporary and local storeage for laetr use (after logout and login, close app an open)
3. Modify quantities and remove item functionalities.

- **Cart Screen** 
1. Displays the products list in the cart. Allows users to modify quantities and remove items. Display dynamic total cost value.
2. A checkout button leads to the chekcout screen.

- **Checkout Screen**
1. Shows an order summary.
2. Allows users to input shipping details. **input validated**
3. Select Shipping method and payment method.
4. Confirms the order with a success message.

- **Profile screen**
1. Show profile picture and othe profile related settings.
2. Logout buton functionality.

## Project Setup Instructions

### Prerequisites
Before setting up the project, ensure that you have the following installed:
- [Node.js](https://nodejs.org/)
- [React Native CLI/EXPO](https://reactnative.dev/)
- Xcode installed on your Mac (required for iOS builds).
- Homebrew and Node.js should be installed on your machine.
- CocoaPods (to manage dependencies).
- ios /android emulator setup

#### Running the Node.js Backend Server  -------------
1. git clone https://github.com/HimashaGallage/nodeServer.git
cd nodeServer

2. Install Dependencies
```
npm install
```

4. Run the node server
```
node server.js
```

6. terminal should display 'Server running on http://localhost:3000'

#### Running the React native app -------------
1. git clone https://github.com/HimashaGallage/Sophie-mobile-app.git

2. Install Dependencies
```cd Sophie-mobile-app```
```npm install```

3. Install CocoaPods
```cd ios```
```pod install```
```cd ..```

4. Start the Metro Bundler: 
Open your terminal and navigate to the project root, then start the Metro bundler:
```npm start```
or
```npx react-native start```

5. Run the iOS App: 
In another terminal window, run the following command to build and launch the app in the iOS simulator:
```npm run ios```
or 
```npx react-native run-ios```

By default, this will run the app on the first available iOS simulator. If you want to specify a particular simulator. you can use the following command:

6. ```npx react-native run-ios --simulator="iPhone 12"```

7. To run test files
```npm run test```


### Troubleshooting:

Make sure Xcode is properly set up, including command line tools.
If the simulator doesn't launch, try opening Xcode and running the app from there.


## Folder Structure
Here’s a breakdown of the project’s folder structure:

```
    .
    ├── android
    ├── ios
    ├── src
    │   ├── assets
    │   │   └── images
    │   ├── components
    │   ├── constants
    │   ├── context
    │   ├── hooks
    │   ├── navigation
    │   │   ├── AuthStack.tsx
    │   │   ├── BottomTab.tsx
    │   │   ├── CartStack.tsx
    │   │   └── ProductStack.tsx
    │   ├── realm
    │   ├── redux
    │   ├── screens
    │   │   ├── Auth
    │   │   ├── Cart
    │   │   ├── Categories
    │   │   ├── Home
    │   │   ├── Products
    │   │   └── Profile
    │   ├── services
    │   ├── styles
    │   ├── types
    │   ├── utils
    │   ├── config.ts
    │   └── declarations.d.ts
    ├── vendor
    ├── App.tsx
    ├── Gemfile
    ├── Gemfile.lock
    ├── README.md
    ├── app.json
    ├── babel.config.js
    ├── index.js
    ├── jest.config.js
    ├── metro.config.js
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```

## Technical implementation
- TypeScript
- React
- React Native
- React Query, useInfiniteQuery
- React Navigation
- Redux Toolkit
- React Navigation
- Axios
- Context API (share theme across app)
- JWT (JSON Web Tokens)
- Keychain (for secure storage)
- Realm Database
- Snack Errors (or Toast Notifications)
- Error Boundaries
- useMemo
- FlatList

## Screenshots

<img src="https://github.com/user-attachments/assets/1fb7bcda-c4c7-40cc-a375-57e3500e3db3" alt="Screenshot" width="169" height="320">

<img src="https://github.com/user-attachments/assets/61c8ccb7-a812-4d02-b315-8abd075c2ed6" alt="Screenshot" width="169" height="320">

<img src="https://github.com/user-attachments/assets/8111f7ae-3ffc-4be8-913a-15dc0de983bb" alt="Screenshot" width="169" height="320">

<img src="https://github.com/user-attachments/assets/2403fa52-bb81-4cd4-bf10-4182d6ac6a49" alt="Screenshot" width="169" height="320">

<img src="https://github.com/user-attachments/assets/03efe234-2095-42e7-b341-6e117d73fbb6" alt="Screenshot" width="169" height="320">

## Known Issues and Improvements

### Known Issues
Please note that this project is developed **for assignment purposes only** and is **not a fully developed production-ready application**. Certain features may be incomplete or not fully functional.
- Error handling and validations might be minimal.
- Some configurations, such as database connections and API endpoints, may need manual setup.
- Not fully tested for iOS and Android enviornment due to resource issues.
- Should implement component composition for better readability.
- Java version error in local environment cause android app loading

### Suggested Improvements
- Signup page backend integration.
- Implement Firbase / AWS User authention mechanism.
- Home screen features
- Notification manaement with firebase
- Profile screen implementations
- Categories tab implementaion
- Impelement custom animated loading compoennt.
- Improve UI/UX for better user experience.
- Implement full backend validation and security measures.
- Implement unit testing for all the features
