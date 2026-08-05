import { Text, StyleSheet, View, Image, Dimensions, Alert, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import Logo from '../assets/logo-pokeapp.png';
import { Input } from '../components/Input';
import { useState } from 'react';
import { Button } from '../components/Button';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);

    function getLogin(){
        if(!email || !password) {
            return Alert.alert("Atenção", "Os campos precisam ser preenchidos!")
        } 
        navigation.navigate("HomeRoutes")
        console.log("Usuário logado!")
    }

    return (
    <LinearGradient
        colors={['#8e0114', '#f06666']}
        start={{x: 0.85, y: 0.85}}
        end={{x: 0.15, y: 0.15}}
        style={style.container}
    >
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView style={style.scrollContainer}>
            <View style={style.viewContainer}>
                <View style={style.logoBox}>
                    <Image
                        source={Logo}
                        style={style.logo}
                        resizeMode='contain'
                    />
                    
                    <Text style={style.title}>Bem-vindo de Volta, {"\n"} Treinador(a)!</Text>
                </View>

                <View style={style.inputBox}>
                    <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>
                    
                    <Input 
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail} 
                        icon={
                            <MaterialIcons 
                                name='email' 
                                size={24}
                                color='#a5a3a3'/>
                        }
                    />
                  
                    <Text style={style.titleInput}>SENHA</Text>

                    <Input 
                        keyboardType='default'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        icon={
                            <TouchableOpacity
                                onPress={() => setshowPassword(!showPassword)}
                            >
                            <MaterialIcons
                                name={showPassword? 'visibility' : 'visibility-off'}
                                size={24}
                                color="#a5a3a3"
                            />  
                            </TouchableOpacity>
                        }
                    />
                </View>

                <View style={style.buttonBox}>
                    <Button text='ENTRAR' onPress={()=>getLogin()}/>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
                </LinearGradient>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 10,
    },
    viewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 150,
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
    formBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonBox: {
        width: '100%',
       height: Dimensions.get('window').height/5,
       alignItems: 'center',
    },
    logo: {
        width: '70%',
        height: '70%',
    },
    title: {
        color: '#722020',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom:'20%',
    },
    titleInput: {
        color: '#dcdcdc',
        marginTop: 10,
        paddingHorizontal: 10,
    }
})