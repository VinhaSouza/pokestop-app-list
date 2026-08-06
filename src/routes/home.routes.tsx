import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListPage from "../pages/ListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import { RootStackParamList } from "../@types/routes";

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
            <Stack.Screen
                name="List"
                component={ListPage}
            />

            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailPage}
            />
        </Stack.Navigator>
    )
}