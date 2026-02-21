import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, List, ShoppingBag, User, Receipt } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { Colors } from '../constants/Colors';
import { useCartStore } from '../store/cart';
import { View, Text, Platform } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    const cartItems = useCartStore(state => state.items);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.text.secondary,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(0,0,0,0.05)',
                    backgroundColor: Colors.background,
                    height: 85,
                    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
                    paddingTop: 10,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '700',
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={2.5} />,
                }}
            />
            <Tab.Screen
                name="Categories"
                component={ProductsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <List color={color} size={size} strokeWidth={2.5} />,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <ShoppingBag color={color} size={size} strokeWidth={2.5} />
                            {cartItems.length > 0 && (
                                <View style={{
                                    position: 'absolute', top: -4, right: -4,
                                    backgroundColor: Colors.primary, borderRadius: 8, width: 16, height: 16,
                                    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.background
                                }}>
                                    <Text style={{ color: 'white', fontSize: 8, fontWeight: 'bold' }}>{cartItems.length}</Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Receipt color={color} size={size} strokeWidth={2.5} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} strokeWidth={2.5} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    contentStyle: { backgroundColor: Colors.background }
                }}
            >
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
