import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, LogBox } from 'react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import CatalogScreen from './screens/CatalogScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import AboutScreen from './screens/AboutScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';

// Initialize cart
if (!global.cartItems) {
  global.cartItems = [];
}

// Logo URL for Flowers N Creams (Updated with the new logo)
global.temporaryLogoUrl = 'https://i.imgur.com/2zzUFu1.png';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Cart badge for showing number of items
const CartIcon = ({ color, size, focused }) => {
  const [badgeCount, setBadgeCount] = React.useState(0);
  
  // Update badge count whenever cart changes
  React.useEffect(() => {
    const updateBadge = () => {
      if (!global.cartItems) {
        global.cartItems = [];
      }
      
      const count = global.cartItems.reduce((total, item) => total + item.quantity, 0);
      setBadgeCount(count);
    };
    
    // Set up interval to check cart - set to more frequent updates
    updateBadge();
    const interval = setInterval(updateBadge, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: '#D06B61',
          borderRadius: 9,
          width: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount > 9 ? '9+' : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
};

// Main tab navigation
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === 'Catalog') {
          iconName = focused ? 'grid' : 'grid-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === 'Cart') {
          return <CartIcon color={color} size={size} focused={focused} />;
        } else if (route.name === 'About') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      },
      tabBarActiveTintColor: '#D06B61',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      tabBarStyle: {
        backgroundColor: '#FFF8F0',
        borderTopColor: '#F0E4D7',
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Catalog" component={CatalogScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="About" component={AboutScreen} />
  </Tab.Navigator>
);

// Main app with stack navigation
const App = () => {
  // Ignore specific warnings - moved inside the component
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore specific warnings
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabHome" component={TabNavigator} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
