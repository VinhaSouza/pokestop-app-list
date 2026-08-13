import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../pages/Loginpage";
import HomeRoutes from "./home.routes";
import RegisterPage from "../pages/RegisterPage";

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
            <Stack.Screen
                name="Register"
                component={RegisterPage}
            />

        </Stack.Navigator>

    )
}