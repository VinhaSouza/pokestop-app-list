import React, { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Header } from '../components/Header'
import { ButtonIcon } from '../components/ButtonIcon'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext'
import { FlatList } from 'react-native-gesture-handler'
import { colors } from '../themes/colors'
import { formatName } from '../utils/formatName'
import { Button } from '../components/Button'

export default function ShoppingCartPage() {
        const { cart, clearCart } = useContext(CartContext); 
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
            <View style={style.listContainer}>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <View style={style.dataCard}>
                        <Text style={style.itemName}>{formatName(item.name)}</Text>
                        <Text style={style.itemQnt}>Quantidade: {item.quantity}</Text>
                        <Text style={style.itemPrice}>Preço UN: {item.price}</Text>
                        <Text style={style.itemTotal}>Total: {item.price * item.quantity}</Text>
                    </View>
                )}
                />
                <Text>Total do carrinho</Text>
                    <Text>{totalPrice}</Text>
            <Button
                style={style.clearButton}
                text="Limpar o Carrinho"
                onPress={clearCart}
            />
        
                </View>
        </View>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 40,
        paddingBottom: 10,
   },
   listContainer: {
    alignItems: 'flex-start',
    paddingVertical: 20,
   },
   dataCard: {
    borderWidth: 1,
    padding: 10,
    paddingRight: 100,
    marginVertical: 10,
    marginLeft: 20,
   },
   itemName: {
    fontSize: 26,
   },
   itemQnt: {
    fontSize: 20,
   },
   itemPrice: {
    fontSize: 20,
   },
   itemTotal: {
    fontSize: 20,
   },
   clearButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
   }

})
