import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { prices } from '../data/prices';
import { storeItems } from '../data/storeItems';
import { Input } from '../components/Input';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ButtonIcon } from '../components/ButtonIcon';

interface dataProduct {
    name: string;
    image: string;
    price: number;
}

export default function ListPage () {
    const navigation = useNavigation<NavigationProp<any>>();

    const [items, setItems] = useState<dataProduct[]>([]);

    useEffect(() => {
        async function getItems() {
            const products: dataProduct[] = [];
                for (const itemName of storeItems) {
                    const response = await api.get(`/item/${itemName}`);

                    products.push({
                        name: response.data.name,
                        image: response.data.sprites.default,
                        price: prices[itemName],
                    });
                }
                setItems(products);  
                console.log("Produtos Carregados!");
        }
        getItems();
    },[]);
    
    const RenderInputHeader = () => (
        <View style={style.searchBox}>
            <Input
                placeholder='Pesquise os itens aqui'
                icon={
                    <MaterialIcons 
                        name='search' 
                        size={24}
                        color='#a5a3a3'/>
                }
            />
        </View>
    );

    return (
        <View style={style.container}>
            <View style={style.containerHeader}>
            <ButtonIcon
                text=''
                icon={<MaterialIcons name='arrow-back' size={35} color='white'/>}
            />
            <Header
                text='PRODUTOS'
            />
            <ButtonIcon
                text=''
                onPress={() => navigation.navigate('ShoppingCart')}
                icon={
                    <MaterialIcons name='shopping-cart' size={35} color='white'/>}
            />
            </View>

            <FlatList
                data={items}
                numColumns={2}
                keyExtractor={(item) => item.name}
                columnWrapperStyle={style.row} // Aplica um estilo em cada linha da lista.
                contentContainerStyle={style.list} // Aplica um estilo ao conteudo inteiro da lista.
                renderItem={({item}) => (
                    <ProductCard
                        name={item.name}
                        image={item.image}
                        price={item.price} 
                        onPress={() => navigation.navigate('ProductDetail', {name: item.name, price: item.price, image: item.image})}
                    />
                )}
                ListHeaderComponent={RenderInputHeader}
            />
        </View>  
   )
}
   
const style = StyleSheet.create({
   container: {
    flex: 1,    
   },
   containerHeader:{
        backgroundColor: '#c22525',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 40,
        paddingBottom: 10,
   },
   row: {
    justifyContent: 'space-between'
   },
   list: {
    padding: 10
   },
   searchBox: {
    marginHorizontal: 20,
    width: '90%',
    paddingBottom: 20,
   },
})