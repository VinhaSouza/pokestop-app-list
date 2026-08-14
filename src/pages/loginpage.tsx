import {
    Text,
    StyleSheet,
    View,
    Image,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity,
} from 'react-native';
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
    const [erros, setErros] = useState({ email: '', password: '' });

    function handleTextChange(
        texto: string,
        setter: (v: string) => void,
        campo: 'email' | 'password',
    ) {
        setter(texto);

        setErros((prev) => ({
            ...prev,
            [campo]: '',
        }));
    }

    const handleLogin = async () => {
        const validation = validateLogin(email, password);

        const errosAtivos = validation.emailError || validation.passwordError;

        if (errosAtivos) {
            setErros({
                email: validation.emailError,
                password: validation.passwordError,
            });
            return;
        }

        setErros({
            email: '',
            password: '',
        });
        setLoading(true);

        try {
            await backendApi.post('/login', { email, password }, { timeout: 3000 });

            navigation.navigate('HomeRoutes');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    Alert.alert('Erro de conexão', 'Não foi possível conectar à API.'); // <-- A distinção de qual erro pode ser ainda não está garantida aqui.
                    return;
                }
                if (error.response.status === 401) {
                    Alert.alert('Login inválido', 'E-mail ou senha incorretos.');
                    return;
                }
            }

            Alert.alert('Erro:', 'Não foi possível realizar o login.'); // <- Qualquer outro erro aqui.
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={[colors.background, colors.backgroundsec]}
            start={{ x: 0.85, y: 0.85 }}
            end={{ x: 0.15, y: 0.15 }}
            style={style.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView style={style.scrollContainer}>
                    <View style={style.viewContainer}>
                        <View style={style.logoBox}>
                            <Image source={Logo} style={style.logo} resizeMode="contain" />

                            <Text style={style.title}>
                                Bem-vindo de Volta, {'\n'} Treinador(a)!
                            </Text>
                        </View>

                        <View style={style.inputBox}>
                            <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>

                            <Input
                                style={[style.inputCamp, erros.email && style.inputError]}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={(txt) => handleTextChange(txt, setEmail, 'email')}
                                icon={
                                    <MaterialIcons
                                        name="email"
                                        style={style.inputIconStyle}
                                        size={iconSizes.meddium}
                                    />
                                }
                            />
                            {erros.email && <Text style={style.errorText}>{erros.email}</Text>}

                            <Text style={style.titleInput}>SENHA</Text>

                            <Input
                                style={[style.inputCamp, erros.password && style.inputError]}
                                keyboardType="default"
                                value={password}
                                onChangeText={(txt) =>
                                    handleTextChange(txt, setPassword, 'password')
                                }
                                secureTextEntry={!showPassword}
                                icon={
                                    <TouchableOpacity
                                        onPress={() => setshowPassword(!showPassword)}>
                                        <MaterialIcons
                                            name={showPassword ? 'visibility' : 'visibility-off'}
                                            style={style.inputIconStyle}
                                            size={iconSizes.meddium}
                                        />
                                    </TouchableOpacity>
                                }
                            />
                            {erros.password && (
                                <Text style={style.errorText}>{erros.password}</Text>
                            )}
                        </View>

                        <View style={style.buttonBox}>
                            <Button
                                style={style.button}
                                text="ENTRAR"
                                loading={loading}
                                onPress={handleLogin}
                            />
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
        height: Dimensions.get('window').height / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: '100%',
        height: Dimensions.get('window').height / 4,
        alignItems: 'flex-start',
        paddingHorizontal: 37,
    },
    inputCamp: {
        height: 48,
        width: '90%',
        borderWidth: 2,
        borderColor: colors.gray,
        borderRadius: 40,
        paddingHorizontal: 20,
    },
    inputError: {
        borderColor: colors.warning,
    },
    errorText: {
        color: colors.warning,
        fontSize: 12,
        marginTop: 4,
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
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 30,
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
        paddingBottom: '20%',
    },
    titleInput: {
        color: colors.inputBackground,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    input: {
        borderWidth: 1,
    },
    inputIconStyle: {
        color: colors.inputIcon,
    },
    footerBox: {
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
    },
});
