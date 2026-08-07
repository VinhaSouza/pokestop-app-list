import { useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { prices } from '../data/prices';
import { storeItems } from '../data/storeItems';
import { Input } from '../components/Input';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ButtonIcon } from '../components/ButtonIcon';
import { CartContext } from '../contexts/CartContext';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';

interface dataProduct {
    name: string;
    image: string;
    price: number;
}

export default function ListPage () {
    const navigation = useNavigation<NavigationProp<any>>();
    const [items, setItems] = useState<dataProduct[]>([]);
    const { totalItems } = useContext(CartContext);

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
                icon={<MaterialIcons name='search' size={iconSizes.meddium} style={style.inputIconStyle}/>}
            />
        </View>
    );


    return (
        <View style={style.container}>
            <View style={style.containerHeader}>
                <ButtonIcon
                    text=''
                    icon={<MaterialIcons name='arrow-back' size={iconSizes.meddium} style={style.iconStyle}/>}
                    onPress={() => navigation.navigate('Login')}
                />

                <Header text='PRODUTOS'/>

                <View style={style.cartBox}>
                    <ButtonIcon
                        text=''
                        icon={<MaterialIcons name='shopping-cart' size={iconSizes.meddium} style={style.iconStyle}/>}
                        onPress={() => navigation.navigate('ShoppingCart')}
                    />
                    <Text style={style.iconCount}>{totalItems}</Text>
                </View>
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
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 40,
    paddingBottom: 10,
   },
   iconStyle: {
    color: colors.white,
   },
   inputIconStyle: {
    color: colors.inputIcon,
   },
   cartBox:{
    flexDirection: 'row',
   },
   iconCount:{
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 100,
    textAlign: 'center',
    paddingHorizontal: 6,
    marginLeft: 30,
    marginTop: 5,
   },
   row: {
    justifyContent: 'space-between',
   },
   list: {
    padding: 10,
   },
   searchBox: {
    marginHorizontal: 20,
    width: '90%',
    paddingBottom: 20,
   },
})