import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Header } from '../components/Header'
import { ButtonIcon } from '../components/ButtonIcon'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function ShoppingCartPage() {
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
            
            <Text style={style.textBox}>Carrinho aqui!</Text>
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
