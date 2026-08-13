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
import axios from 'axios';
import { validateLogin } from '../utils/loginValidation';

export default function LoginPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        const validation = validateLogin(email, password)
            if (validation.type) { // Aqui é o "", o if entende como "false" e não dispara o
                Alert.alert(validation.type, validation.message);
            return;
        }
        setLoading(true);
        
        try {
            await backendApi.post("/login", {email, password}, {timeout: 3000});

            navigation.navigate("HomeRoutes");
        } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (!error.response) {
                        Alert.alert("Erro de conexão", "Não foi possível conectar à API."); // <-- A distinção de qual erro pode ser ainda não está garantida aqui.  
                        return;
                    }
                    if (error.response.status === 401) {
                        Alert.alert("Login inválido", "E-mail ou senha incorretos.");
                        return;
                    }
                }

            Alert.alert("Erro:", "Não foi possível realizar o login."); // <- Qualquer outro erro aqui.
        
        } finally {
            setLoading(false);
        }
    };
    
    return (
    <LinearGradient
        colors={[colors.background, colors.backgroundsec]}
        start={{x: 0.85, y: 0.85}}
        end={{x: 0.15, y: 0.15}}
        style={style.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                            icon={<MaterialIcons name='email' style={style.inputIconStyle} size={iconSizes.meddium}/>}
                        />
                    
                        <Text style={style.titleInput}>SENHA</Text>

                        <Input 
                            keyboardType='default'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            icon={
                                <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                                    <MaterialIcons name={showPassword? 'visibility' : 'visibility-off'} style={style.inputIconStyle} size={iconSizes.meddium}/>  
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    <View style={style.buttonBox}>
                        <Button style={style.button} text='ENTRAR' loading={loading} onPress={handleLogin}/>
                    </View>

                    <View style={style.footerBox}>
                        <Text style={style.textReg}>Não tem uma conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={style.signupText}>Cadastre-se aqui!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </LinearGradient>
    );
};

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
    footerBox:{
        flexDirection: 'row',
    },
    signupText: {
        color: colors.defaulttext,
        fontWeight: 600,
        fontSize: 16,
    },
    textReg: {
        fontSize: 16,
        fontWeight: 600,
        color: colors.white,
    }
})