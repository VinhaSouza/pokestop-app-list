import './gesture-handler';
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <NavigationContainer>
                    <Routes />
                </NavigationContainer>
            </CartProvider>
        </AuthProvider>
    );
}
