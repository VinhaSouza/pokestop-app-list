import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import { Header } from '../components/Header'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'

export default function listPage () {
    
   return (
        <View style={style.container}>
            <Header />

            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={style.row}
                contentContainerStyle={style.list}
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
   }
})