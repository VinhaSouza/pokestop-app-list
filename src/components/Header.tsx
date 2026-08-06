import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ButtonIcon } from './ButtonIcon';

export function Header() {
    const navigation = useNavigation<NavigationProp<any>>();
    return (
        <View style={style.container}>
            <ButtonIcon
                style={style.boxIcon}
                text=''
                onPress={() => navigation.navigate('Login')}
                icon={
                    <MaterialIcons name='arrow-back' size={32}/>
                }
            />
      
            <Text style={style.title}>
                PRODUTOS{"\n"}EM DESTAQUE
            </Text>

            <ButtonIcon
                style={style.boxIcon}
                text=''
                onPress={() => navigation.navigate('')}
                icon={
                    <MaterialIcons name='shopping-cart' size={32}/>
                }
            />
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