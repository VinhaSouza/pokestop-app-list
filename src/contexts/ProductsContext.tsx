import { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeItems } from '../data/storeItems';
import { prices } from '../data/prices';
import { api } from '../services/api';

const PRODUCTS_STORAGE_KEY = '@pokestop:products';

interface DataProduct {
    name: string;
    image: string;
    price: number;
}

interface ProductsContextData {
    products: DataProduct[];
    loading: boolean;
}

interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = useState<DataProduct[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            console.log('1 - ProductContext: Iniciando carregamento...');
            setLoading(true);

            try {
                // await AsyncStorage.removeItem(PRODUCTS_STORAGE_KEY); // <-- Comando para limpar o Storage para testar como é pegar os produtos da PokeAPI pela primeira vez
                // console.log("! - Storage limpo")

                //1 - Tenta buscar produtos salvos no Storage
                const storedProducts = await AsyncStorage.getItem(PRODUCTS_STORAGE_KEY);

                console.log('2 - Storage:', storedProducts ? 'dados encontrados' : 'vazio');

                //2 - Se encontrou, usa o Storage
                if (storedProducts) {
                    const productsFromStorage: DataProduct[] = JSON.parse(storedProducts);

                    await new Promise((resolve) => setTimeout(resolve, 3000)); // <- Adicionado apenas para testar visualmente o loading. (não é necessário)

                    console.log('3 - Produtos carregados do STORAGE', productsFromStorage.length);

                    setProducts(productsFromStorage);

                    return;
                }

                //3 - Se não encontrou, busca na PokeAPI
                const productsFromApi: DataProduct[] = [];

                console.log('4 - Produtos carregados da PokeAPI', productsFromApi.length);

                for (const itemName of storeItems) {
                    console.log('StoreItems:', storeItems);

                    console.log('Quantidade de items:', storeItems.length);

                    const response = await api.get(`/item/${itemName}`);

                    productsFromApi.push({
                        name: response.data.name,
                        image: response.data.sprites.default,
                        price: prices[itemName],
                    });
                }

                //4 - Coloca os produtos no Storage
                setProducts(productsFromApi);

                //5 - Salva os produtos no Storage
                await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsFromApi));

                console.log('5 - Produtos salvos no STORAGE', productsFromApi.length);
            } catch (error) {
                console.log('Error ao carregar os produtos.', error);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                products,
                loading,
            }}>
            {children}
        </ProductsContext.Provider>
    );
}
