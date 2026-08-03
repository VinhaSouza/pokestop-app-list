import './gesture-handler';
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
    
  );
}

