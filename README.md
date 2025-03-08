# Sophie - shopping app

## Overview
Sophie Shopping App is a simple e-commerce platform built with React Native and TypeScript. It features a smooth shopping flow, allowing users to browse products, add to cart, and complete purchases easily.

## Features
- **Feature 1:** 
Login Screen: Provides basic login functionality users can input their username and password. It fetches data from a mock API for user authentication. Upon successful login, users are redirected to the home or product listing screen. If the credentials are incorrect, an error message is shown.

- **Feature 2:** 
Shop Screen: Fetches products from a mock API. Displaying name, image, price of products. Ssupports infinite scrolling for easy browsing.

- **Feature 3:** 
Product Details Screen: Provides detail view of a product with an option to addd to cart, modify quantities and remove items.

- **Feature 4:** 
Cart Screen: Displays the products list in the cart. Allows users to modify quantities and remove items. Daisplay dynamic total cost value. A checkout button leads to the chekcout screen.

- **Feature 5:**
Checkout Screen: Shows an order summary. Allows users to input shipping details, shipping method and payment method. Confirms the order with a success message.

- **Feature 6:**
Profile screen: Show profile picture and othe profile related settings. Logout buton functionality.

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
npm install

3. Run the node server
node server.js

4. terminal should display 'Server running on http://localhost:3000'

#### Running the React native app -------------
1. git clone https://github.com/HimashaGallage/Sophie-mobile-app.git

2. Install Dependencies
cd Sophie-mobile-app
npm install

3. Install CocoaPods
cd ios
pod install
cd ..

4. Start the Metro Bundler: 
Open your terminal and navigate to the project root, then start the Metro bundler:
npm start
or
npx react-native start

5. Run the iOS App: 
In another terminal window, run the following command to build and launch the app in the iOS simulator:
npm run ios
or 
npx react-native run-ios

By default, this will run the app on the first available iOS simulator. If you want to specify a particular simulator. you can use the following command:

6. npx react-native run-ios --simulator="iPhone 12"

7. To run test files
npm run test


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
- TypeScript types and interfaces
- Context API for theme sharing.
- Redux Toolkit for state management
- React Navigation Stack Navigation and Bottom Tab Navigation
- Axios retrieve product data from a mock API server.
- Error Boundaries to catch and handle UI errors gracefully.
- Network Error Handling with snack errors

## Screenshots
![Login](https://github.com/user-attachments/assets/1fb7bcda-c4c7-40cc-a375-57e3500e3db3)
![product_list](https://github.com/user-attachments/assets/61c8ccb7-a812-4d02-b315-8abd075c2ed6)
![cart](https://github.com/user-attachments/assets/2403fa52-bb81-4cd4-bf10-4182d6ac6a49)
![checkout](https://github.com/user-attachments/assets/03efe234-2095-42e7-b341-6e117d73fbb6)



## Known Issues and Improvements

### Known Issues
- This project is developed **for assignment purposes only** and is **not a fully developed production-ready application**.
- Certain features may be incomplete or not fully functional.
- Error handling and validations might be minimal.
- Some configurations, such as database connections and API endpoints, may need manual setup.
- Not fully tested for iOS and Android enviornment due to resource issues.
- Implement component composition for better readability

### Suggested Improvements
- Improve UI/UX for better user experience.
- Implement full backend validation and security measures.
- Add comprehensive testing (unit, integration, and end-to-end tests).
- Refactor code for better maintainability and scalability.
