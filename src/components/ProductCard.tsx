import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { formatName } from '../utils/formatName';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { ButtonIcon } from './ButtonIcon';

interface Props {
    name: string;
    image: string;
    price: number;
    onPress: () => void;
}

export function ProductCard({ name, image, price, onPress }: Props) {
    return (
        <View style={style.cardsProcuct}>
            <TouchableOpacity
                style={style.imageBox}
                onPress={onPress}
            >
                <Image
                    source={{uri: image}}
                    style={style.imageProduct}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            

            <Text style={style.nameProduct}>{formatName(name)}</Text>
            
            <View style={style.shopBox}>
                <Text style={style.priceProduct}>G {price}</Text>
            
                <ButtonIcon
                    text=''
                    onPress={() => navigation.navigate('')}
                    icon={
                        <MaterialIcons style={style.iconBox} name='add' size={24} color='white'/>
                    }
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create ({
    cardsProcuct: {
        backgroundColor: '#ffffff',
        width: "48%",
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        elevation: 7
    },
    imageBox:{
        alignItems: "center",
    },
    imageProduct: {
        width: 120,
        height: 120,
        marginBottom: 10
    },
    shopBox:{
        flexDirection: 'row',
        alignItems:'center'
    },
    nameProduct: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'left',
        paddingLeft: 10,
    },
    priceProduct: {
        color: '#E53935',
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 10,
    },
    iconBox:{
        marginHorizontal: 40,
        backgroundColor: '#c22525',
        borderRadius: 100,
        padding: 10,
    },
})