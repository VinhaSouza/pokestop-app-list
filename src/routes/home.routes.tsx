import { createStackNavigator } from "@react-navigation/stack";
import ListPage from "../pages/listPage";
import DetailRoutes from "./detail.routes";

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
                component={ListPage}
            />

            <Stack.Screen
                name="DetailRoutes"
                component={DetailRoutes}
            />
        </Stack.Navigator>
    )
}