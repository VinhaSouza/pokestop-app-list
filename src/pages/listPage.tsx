import React from 'react'
import { useEffect,useState } from 'react'
import { api } from '../services/api'
import { StyleSheet, View, FlatList } from 'react-native'
import { Header } from '../components/Header'
import { ProductCard } from '../components/ProductCard'
import { prices } from '../data/prices'
import { storeItems } from '../data/storeItems'

export default function listPage () {
    const [item, setItem] = useState<any>('');
    const price = item ? prices[item.name] : 0
    const productList = [
        {
            name: item?.name,
            image: item?.sprites?.default,
            price: price
        }
    ]

    useEffect(() => {
        async function getItem() {
            const response = await api.get(`/item/${storeItems[19]}`);
            setItem(response.data);  
        }
        
        getItem();
        
    },[]);

    console.log(item);

   return (
        <View style={style.container}>
            <Header />

            <FlatList
                data={productList}
                numColumns={2}
                keyExtractor={(item) => item.name}
                columnWrapperStyle={style.row} // Aplica um estilo em cada linha da lista.
                contentContainerStyle={style.list} // Aplica um estilo ao conteudo inteiro da lista.
                renderItem={({item}) => (
                    <ProductCard
                        name={item.name}
                        image={item.image}
                        price={item.price}  
                    />
                )}
            />     
        </View>  
   )
}
   
const style = StyleSheet.create({
    container: {
       flex: 1,    
       backgroundColor: '#d34747'
   },
   row: {
    justifyContent: 'space-between'
   },
   list: {
    padding: 10
   },
})