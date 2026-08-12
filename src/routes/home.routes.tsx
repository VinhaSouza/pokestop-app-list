import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListPage from "../pages/ListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import { RootStackParamList } from "../@types/routes";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import { ProductsProvider } from "../contexts/ProductsContext";

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeRoutes() {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                }
            }}
        >
            <Stack.Screen name="List">
                {() => (
                    <ProductsProvider>
                        <ListPage/>
                    </ProductsProvider>
                )}
            </Stack.Screen>

            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailPage}
            />

            <Stack.Screen
                name="ShoppingCart"
                component={ShoppingCartPage}
            />
            
        </Stack.Navigator>
    )
}