import './gesture-handler';
import { CartProvider } from './src/contexts/CartContext';
import { ProductsProvider } from './src/contexts/ProductsContext';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <NavigationContainer>
          <Routes/>
        </NavigationContainer>
      </ProductsProvider>
    </CartProvider>
  );
}

