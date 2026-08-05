import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailPage from "../pages/ProductDetailPage";

    const Stack = createStackNavigator();

export default function DetailRoutes() {
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
                name='ProductDetail'
                component={ProductDetailPage}
            /> 
        </Stack.Navigator>
    )
}