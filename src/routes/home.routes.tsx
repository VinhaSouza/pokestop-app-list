import { createStackNavigator } from "@react-navigation/stack";
import listPage from "../pages/listPage";

const Stack = createStackNavigator();

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
                component={listPage}
            />
        </Stack.Navigator>
    )
}