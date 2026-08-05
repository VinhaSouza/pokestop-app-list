import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export function Header() {
    const navigation = useNavigation<NavigationProp<any>>();
    return (
        <View style={style.container}>
            <View style={style.boxIcon}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <MaterialIcons
                    name='arrow-back'
                    size={32}
                />
            </TouchableOpacity>
            </View>

            <Text style={style.title}>
                PRODUTOS{"\n"}EM DESTAQUE
            </Text>

            <View style={style.boxIcon}>
                <MaterialIcons
                    name='shopping-cart'
                    size={32}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#c22525',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40,
    },
    boxIcon:{
        backgroundColor: 'white',
        borderRadius: '100%',
        padding: 6,
    },
    title: {
        fontSize: 24,
        padding: 10,
        color: 'white',
        fontWeight: '900',
        textAlign: 'center',
    }
})