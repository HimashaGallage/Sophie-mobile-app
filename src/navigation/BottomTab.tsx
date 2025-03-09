import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import CartStack from './CartStack';
import ProductStack from './ProductStack';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { bottom_tabs } from '../constants/strings';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Create a function to render header icons
  const renderHeaderIcons = () => (
    <View style={styles.iconSection}>
      <MaterialCommunityIcons
        name="bell-outline"
        size={27}
        color={theme.Colors.primary}
        style={styles.headerIcon}
      />
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.Colors.white },
        tabBarActiveTintColor: theme.Colors.secondary,
        tabBarInactiveTintColor: theme.Colors.black,
      }}>
      <Tab.Screen
        name={bottom_tabs.home} component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.Colors.white,
          },
          headerRight: renderHeaderIcons,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={bottom_tabs.products}
        component={ProductStack} options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "shopping" : "shopping-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
      <Tab.Screen
        name={bottom_tabs.cart}
        component={CartStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cart" : "cart-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
      <Tab.Screen
        name={bottom_tabs.me}
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.Colors.white,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
    </Tab.Navigator>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  iconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerIcon: {
    padding: 4
  }
})

export default BottomTab;