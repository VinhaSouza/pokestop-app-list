import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'


export default function listPage () {
    
        const dados = [
            {key: 'Produto 1'},
            {key: 'Produto 2'},
            {key: 'Produto 3'},
            {key: 'Produto 4'},
            {key: 'Produto 5'},
            {key: 'Produto 6'},   
            {key: 'Produto 7'},
            {key: 'Produto 8'},
            {key: 'Produto 9'},
            {key: 'Produto 10'},
            {key: 'Produto 11'},
            {key: 'Produto 12'},
            {key: 'Produto 13'},
            {key: 'Produto 14'},

        ]
   return (

        <View style={style.container}>
            <Text style={style.header}>Conheça nossos produtos!</Text>

            <FlatList
                data={dados}
                renderItem={({item}) =>
                    <View style={style.containerProdutos}>
                        <Text style={style.titleProdutos}> {item.key} </Text>
                    </View>
                }
            />     
        </View>
        
    )
}
   
const style = StyleSheet.create({
    container: {
       flex: 1,
       padding: 10,
   },
   containerProdutos:{
    backgroundColor: 'pink',
    height: 80,
    width: '100%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
   },
   header:{
    margin: 20,
    fontSize:20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',

   },
   titleProdutos:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
   }
})