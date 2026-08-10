import './gesture-handler';
import { CartProvider } from './src/contexts/CartContext';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </CartProvider>
    
  );
}

