import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { formatName } from '../utils/formatName';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { ButtonIcon } from './ButtonIcon';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';

interface Props {
    name: string;
    image: string;
    price: number;
    onPress: () => void;
}

export function ProductCard({ name, image, price, onPress }: Props) {
    const navigation = useNavigation<NavigationProp<any>>();
    return (
        <View style={style.cardsProcuct}>
            <TouchableOpacity style={style.imageBox} onPress={onPress}>
                <Image source={{ uri: image }} style={style.imageProduct} resizeMode="contain" />
            </TouchableOpacity>

            <Text style={style.nameProduct}>{formatName(name)}</Text>

            <View style={style.shopBox}>
                <Text style={style.priceProduct}>G {price}</Text>

                <ButtonIcon
                    text=""
                    onPress={() => navigation.navigate('ShoppingCart')}
                    icon={
                        <MaterialIcons
                            style={style.iconBox}
                            name="add-shopping-cart"
                            size={iconSizes.meddium}
                        />
                    }
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    cardsProcuct: {
        backgroundColor: colors.white,
        width: '48%',
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        elevation: 7,
    },
    imageBox: {
        alignItems: 'center',
    },
    imageProduct: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    shopBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameProduct: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'left',
        paddingLeft: 10,
    },
    priceProduct: {
        color: colors.defaulttext,
        marginTop: 5,
        fontWeight: '600',
        fontSize: 16,
        paddingLeft: 10,
    },
    iconBox: {
        marginHorizontal: 40,
        backgroundColor: colors.primary,
        color: colors.colorIcon,
        borderRadius: 100,
        padding: 12,
    },
});
