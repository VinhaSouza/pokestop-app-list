import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../@types/routes';
import { api } from '../services/api';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { ButtonIcon } from '../components/ButtonIcon';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';

export default function ProductDetailPage () {
    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
    const { name } = route.params;
    const { price } = route.params;
    const { image } = route.params;
    const [item, setItem] = useState<any>('');

    async function getItems() {
        const response = await api.get(`/item/${name}`);
        setItem(response.data)
    }
    useEffect(() => {
        getItems();
    },)

    return (
        <View style={style.container}>
            <View style={style.imageBox}>
                <Image
                    source={{uri: image}}
                    style={style.image}
                />
            </View>

            <View style={style.nameBox}>
                <Text style={style.name}>{name}</Text>
            </View>

            <View style={style.priceBox}>
                <Text style={style.name}>{price}</Text>
            </View>

            <ButtonIcon style={style.addButton} text="" onPress={() => navigation.navigate('List')}
                icon={<MaterialIcons name='add' size={40}/>}
            />

            <View style={style.descriptionBox}>
                <Text style={style.description}>
                    {item?.effect_entries?.
                        find(
                            (text: any) => text.language.name === 'en'
                        )?.effect
                    }
                </Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBox: {

    },
    image: {
        width: 150,
        height: 150
    },
    nameBox: {

    },
    name: {

    },
    priceBox: {

    },
    price: {

    },
    addButton: {

    },
    descriptionBox: {

    },
    description: {

    },
})
