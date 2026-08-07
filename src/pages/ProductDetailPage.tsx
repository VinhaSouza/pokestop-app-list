import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../@types/routes';
import { api } from '../services/api';
import { ButtonIcon } from '../components/ButtonIcon';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { formatName } from '../utils/formatName';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../contexts/CartContext';
import MaterialIcons from '@react-native-vector-icons/material-icons';


export default function ProductDetailPage () {
    //const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
    const { name } = route.params;
    const { price } = route.params;
    const { image } = route.params;
    const [item, setItem] = useState<any>('');
    const { increase, decrease, getQuantity } = useContext(CartContext);
    const quantity = getQuantity(name);

    async function getItems() {
        const response = await api.get(`/item/${name}`);
        setItem(response.data)
    }
    useEffect(() => {
        getItems();
    },)

    return (
         <LinearGradient
                colors={['#ee7181', '#eec7c7']}
                start={{x: 0.85, y: 0.85}}
                end={{x: 0.15, y: 0.15}}
                style={style.container}
            >
            <View style={style.container}>
                <View style={style.imageBox}>
                    <Image
                        source={{uri: image}}
                        style={style.image}
                    />
                </View>

                <View style={style.descriptionBox}>
                    <Text style={style.name}>{formatName(name)}</Text>
            
                    <Text style={style.price}> G {price}</Text>

                    <View style={style.countBox}>
                    
                        <ButtonIcon 
                            style={style.buttonAdd}    
                            text=''
                            icon={<MaterialIcons name='add' size={40} color={'red'}/>}
                            onPress={() => increase({name, price})}/>
                        

                        <Text>{quantity}</Text>

                        <TouchableOpacity style={style.buttonMinus} onPress={() => decrease(name)}>   
                            <Text> - </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={style.description}>
                        {item?.effect_entries?.find((text: any) => text.language.name === 'en')?.effect}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBox: {
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 50,
        elevation: 10,
    },
    image: {
        width: 200,
        height: 200
    },
    descriptionBox: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 15,
    },
    buttonAdd: {

    },
    countBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonMinus: {

    },
    description: {
        textAlign: 'justify',
        fontSize:20,
        fontStyle: 'italic',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
})
