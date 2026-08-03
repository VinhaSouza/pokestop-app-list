import { Text, StyleSheet, View, Image, Dimensions, Alert } from 'react-native';
import Logo from '../assets/bem-vinda.png';
import { Input } from '../components/Input';
import { useState } from 'react';
import { Button } from '../components/Button';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function getLogin(){
        try {
            if(!email || !password) {
                return Alert.alert("Atenção", "Os campos precisam ser preenchidos!")
            } 
            
            console.log("Usuário logado!")

        } catch (error) {
            console.log('error')
        }
    }

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
                <Input 
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={style.titleInput}>SENHA</Text>
                <Input 
                    keyboardType='numeric'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={style.buttonBox}>
                <Button text='ENTRAR' onPress={()=>getLogin()}/>
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
    }
})