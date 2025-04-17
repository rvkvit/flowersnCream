# Flowers N Creams Bakery App

<p align="center">
  <img src="./assets/images/flowers_n_creams_logo.jpg" alt="Flowers N Creams Logo" width="300">
</p>

## 📱 About The App

Flowers N Creams is a beautiful mobile application for a bakery business, allowing customers to browse products, place orders, and learn about the bakery. Built with React Native and Expo, this app provides a seamless and delightful shopping experience for bakery enthusiasts.

## ✨ Features

- **Beautiful UI**: Clean, modern, and intuitive user interface with a consistent design language
- **Navigation**: Tab-based navigation with intuitive flow between screens
- **Product Catalog**: Browse products by category with detailed product information
- **Shopping Cart**: Add items to cart, adjust quantities, and review before checkout
- **Multiple Payment Options**: Checkout securely through different payment methods
- **About Us Section**: Learn about the bakery's story, values, and contact information

## 🚀 Screens

- **Home Screen**: Showcases featured products, categories, and special offers
- **Catalog Screen**: Browse all products with filtering by category and search
- **Product Details Screen**: Detailed view of products with ordering options
- **Cart Screen**: Review cart items, adjust quantities, and proceed to checkout
- **Payment Screen**: Complete orders with payment information
- **About Screen**: Information about the bakery, contact details, and social media

## 🛠️ Technologies Used

- **React Native**: Core framework for building the mobile application
- **Expo**: Development platform for React Native
- **React Navigation**: Navigation library with stack and tab navigators
- **Expo Vector Icons**: Comprehensive icon library
- **AsyncStorage**: Local data persistence
- **Expo WebBrowser**: For external links and payment integrations

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS/Android simulator or physical device

### Installation Steps

1. **Clone the repository**
   ```
   git clone https://github.com/rvkvit/flowersnCream.git
   cd BakeryApp
   ```

2. **Install dependencies**
   ```
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android simulator
   - Scan QR code with the Expo Go app on your physical device

## 📁 Project Structure

```
BakeryApp/
├── assets/           # Images, fonts, and other static assets
├── screens/          # Application screens
│   ├── HomeScreen.js
│   ├── CatalogScreen.js
│   ├── OrderDetailsScreen.js
│   ├── CartScreen.js
│   ├── PaymentScreen.js
│   └── AboutScreen.js
├── App.js            # Main application component with navigation
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

## 💻 Development

The app follows a component-based architecture with React Navigation for screen management. The UI is designed with a consistent color scheme focusing on user experience and ease of navigation.

### Key Implementation Details

- **Navigation**: Combination of tab navigator for main screens and stack navigator for detailed views
- **State Management**: Uses React's Context API and useState/useEffect hooks
- **Data Flow**: Props and callbacks for component communication
- **Styling**: StyleSheet API for consistent styling across components
- **Responsiveness**: Flexible layouts that adapt to different screen sizes

## 🔗 Links

- **GitHub Repository**: [https://github.com/rvkvit/flowersnCream](https://github.com/rvkvit/flowersnCream)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [Unsplash](https://unsplash.com) for the beautiful bakery images used in the app
- [React Native Community](https://reactnative.dev/community/overview) for the excellent documentation and support
- [Expo Team](https://expo.dev) for the powerful development tools

---

<p align="center">
  Made with ❤️ for Flowers N Creams Bakery
</p>