import { Image, StyleSheet, Text, View } from 'react-native'
import { formatName } from '../utils/formatName';

interface Props {
    name: string;
    image: string;
    price: number;
}

export function ProductCard({ name, image, price }: Props) {
    return (
        <View style={style.cardsProcuct}>
            <Image
                source={{uri: image}}
                style={style.imageProduct}
                resizeMode='contain'
            />
            <Text style={style.nameProduct}>{formatName(name)}</Text>
            <Text style={style.priceProduct}>G {price}</Text>
        </View>
    )
}

const style = StyleSheet.create ({
    cardsProcuct: {
        backgroundColor: '#fff',
        width: "48%",
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        alignItems: "center",
        elevation: 4

    },
    imageProduct: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    nameProduct: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    priceProduct: {
        color: '#E53935',
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16
    }
})