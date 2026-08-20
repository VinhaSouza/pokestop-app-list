import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListPage from '../pages/ListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import { RootStackParamList } from '../@types/routes';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import { ProductsProvider } from '../contexts/ProductsContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritePage from '../pages/FavoritePage';
import ProfilePage from '../pages/ProfilePage';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                options={{
                    title: 'Início',
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="home"
                            size={iconSizes.meddium}
                            color={colors.primary}
                        />
                    ),
                }}>
                {() => (
                    <ProductsProvider>
                        <ListPage />
                    </ProductsProvider>
                )}
            </Tab.Screen>

            <Tab.Screen
                name="Favorites"
                component={FavoritePage}
                options={{
                    title: 'Favoritos',
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="favorite"
                            size={iconSizes.meddium}
                            color={colors.primary}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfilePage}
                options={{
                    title: 'Perfil',
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="account-circle"
                            size={iconSizes.meddium}
                            color={colors.primary}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function HomeRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />

            <Stack.Screen name="ProductDetail" component={ProductDetailPage} />

            <Stack.Screen name="ShoppingCart" component={ShoppingCartPage} />
        </Stack.Navigator>
    );
}
