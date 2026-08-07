import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Header } from '../components/Header'
import { ButtonIcon } from '../components/ButtonIcon'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext'
import { FlatList } from 'react-native-gesture-handler'

export default function ShoppingCartPage() {
        const { cart } = useContext(CartContext); 
        const totalPrice = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
        const navigation = useNavigation<NavigationProp<any>>()
    return (
        <View style={style.container}>
            <View style={style.containerHeader}>
                <ButtonIcon
                    text=''
                    onPress={() => navigation.navigate('List')}
                    icon={<MaterialIcons name='arrow-back' size={30} color='white'/>}
                />
                
                <Header text='Seu Carrinho'/>
            </View>
            
            <FlatList
                data={cart}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>Quantidade: {item.quantity}</Text>
                        <Text>Preço UN: {item.price}</Text>
                        <Text>Total: {item.price * item.quantity}</Text>
                        <Text>Total do carrinho</Text>
                            <Text>{totalPrice}</Text>
                    </View>
                )}
            />
        </View>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    containerHeader:{
        backgroundColor: '#c22525',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 40,
        paddingBottom: 10,
   },
    textBox:{
        fontSize: 30,
        textAlign: 'center',
        paddingVertical: '100%',
    },

})
