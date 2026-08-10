import { Text, StyleSheet, View, Image, Dimensions, Alert, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import Logo from '../assets/logo-pokeapp.png';
import { Input } from '../components/Input';
import { useState } from 'react';
import { Button } from '../components/Button';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { iconSizes } from '../themes/iconSizes';
import { colors } from '../themes/colors';
import { backendApi } from '../services/api';

export default function LoginPage() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);

    const getLogin = async () => {
        try {
            const response = await backendApi.post("/login", {email, password});
            
            console.log("Login realizado:", response.data);
            
            navigation.navigate("HomeRoutes");
        } catch (error) {
            Alert.alert("Login Inválido", "Email ou senha incorretos!")
        }
    };
    
    return (
    <LinearGradient
        colors={[colors.background, colors.backgroundsec]}
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
                        icon={<MaterialIcons name='email' style={style.inputIconStyle} size={iconSizes.meddium}/>
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
                            <MaterialIcons name={showPassword? 'visibility' : 'visibility-off'} style={style.inputIconStyle} size={iconSizes.meddium}/>  
                            </TouchableOpacity>
                        }
                    />
                </View>

                <View style={style.buttonBox}>
                    <Button style={style.button} text='ENTRAR' onPress={getLogin}/>
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 60,
        backgroundColor: colors.primary,
        borderRadius: 30,
        shadowColor: colors.black,
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 8,   
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
        color: colors.secondary,
        fontWeight: '600',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom:'20%',
    },
    titleInput: {
        color: colors.inputBackground,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    inputIconStyle: {
        color: colors.inputIcon,
    },
})