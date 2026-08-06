import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../pages/LoginPage";
import HomeRoutes from "./home.routes";

export default function Routes() {
    const Stack = createStackNavigator();
    
    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                }
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginPage}
            />
            <Stack.Screen
                name="HomeRoutes"
                component={HomeRoutes}
            />

        </Stack.Navigator>

    )
}