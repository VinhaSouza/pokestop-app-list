import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default function listPage () {
   return (
           <View style={style.container}>
               <Text>Os Produtos vão aparecer aqui!</Text>
           </View>
    )
}
   
const style = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
})