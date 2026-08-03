import { Text, StyleSheet, View, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Logo from '../assets/bem-vinda.png';

export default function LoginPage() {
    return (
        <View style={style.container}>
            
            <View style={style.logoBox}>
                <Image
                    source={Logo}
                    style={style.logo}
                    resizeMode='contain'
                />
                <Text style={style.title}>Bem-vindo de volta!</Text>
            </View>

            <View style={style.inputBox}>
                <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>
                    <View style={style.formBox}>
                        <TextInput style={style.input} />
                        <Text>Icon</Text>
                    </View>
                <Text style={style.titleInput}>SENHA</Text>
                    <View style={style.formBox}>
                        <TextInput style={style.input}/>
                        <Text>Icon</Text>
                    </View>
            </View>

            <View style={style.buttonBox}>
                <TouchableOpacity style={style.button} activeOpacity={0.5}>
                    <Text style={style.buttonTitle}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logoBox: {
       width: '100%',
       height: Dimensions.get('window').height/3,
       alignItems: 'center',
       justifyContent: 'center',
       //backgroundColor: 'red',
    },
    inputBox: {
        width: '100%',
       height: Dimensions.get('window').height/4,
       alignItems: 'flex-start',
       paddingHorizontal: 37,
    },
    buttonBox: {
        width: '100%',
       height: Dimensions.get('window').height/5,
       alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: 16,
    },
    titleInput: {
        color: 'gray',
        marginTop: 10,
        paddingHorizontal: 10,
        
    },
    formBox: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        flexDirection: 'row',
        marginTop: 10,
        borderColor: 'gray',
        backgroundColor: 'lightgray',
        alignItems: 'center',
        

    },
    input: {
        width:'85%',
        height: '100%',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        backgroundColor: '#f35959',
        borderRadius: 40,
    },
    buttonTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    }
})