import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import Logo from '../assets/logo-pokeapp.png';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Input } from '../components/Input';
import { useState } from 'react';
import { Button } from '../components/Button';
import { backendApi } from '../services/api';
import { validateRegister } from '../utils/registerValidation';
import { gradientConfig } from '../themes/gradientConfig';

export default function RegisterPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const [erros, setErros] = useState({ name: '', email: '', password: '' });

    function handleTextChange(
        texto: string,
        setter: (v: string) => void,
        campo: 'name' | 'email' | 'password',
    ) {
        setter(texto);

        setErros((prev) => ({
            ...prev,
            [campo]: '',
        }));
    }

    const handleResgiter = async () => {
        const validation = validateRegister(name, email, password);

        const errosAtivos =
            validation.nameError || validation.emailError || validation.passwordError;

        if (errosAtivos) {
            setErros({
                name: validation.nameError,
                email: validation.emailError,
                password: validation.passwordError,
            });
            return;
        }

        setErros({
            name: '',
            email: '',
            password: '',
        });

        try {
            await backendApi.post('/users', { name, email, password });
            navigation.navigate('Login');
            console.log('Usuário cadastrado com sucesso');
        } catch (error) {
            Alert.alert('Erro:', 'Erro ao realizar o cadastro, tente novamente.');
        }
    };
    return (
        <LinearGradient
            colors={[colors.background, colors.backgroundsec]}
            start={gradientConfig.start}
            end={gradientConfig.end}
            style={style.container}>
            <KeyboardAvoidingView style={style.keyBoardContainer} behavior="padding">
                <ScrollView
                    contentContainerStyle={style.scrollContainer}
                    keyboardShouldPersistTaps="handled">
                    <View style={style.viewContainer}>
                        <View style={style.logoBox}>
                            <Image source={Logo} style={style.logo} resizeMode="contain" />
                        </View>

                        <Text style={style.title}>Seja Bem-vindo, Treinador(a)!</Text>
                        <Text style={style.secTitle}>
                            Preencha os campos abaixo para Registrar-se
                        </Text>

                        <View style={style.inputBox}>
                            <Text style={style.titleInput}>SEU NOME OU APELIDO</Text>

                            <Input
                                style={[style.input, erros.name && style.inputError]}
                                value={name}
                                onChangeText={(txt) => handleTextChange(txt, setName, 'name')}
                                icon={
                                    <MaterialIcons
                                        name="create"
                                        style={style.inputIconStyle}
                                        size={iconSizes.meddium}
                                    />
                                }
                            />
                            {erros.name && <Text style={style.errorText}>{erros.name}</Text>}

                            <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>

                            <Input
                                style={[style.input, erros.email && style.inputError]}
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
                            {/* {console.log(erros)} */}

                            <Text style={style.titleInput}>SENHA</Text>

                            <Input
                                style={[style.input, erros.password && style.inputError]}
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
                                text="REGISTRAR"
                                onPress={handleResgiter}
                            />
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
    keyBoardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    viewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    title: {
        color: colors.secondary,
        fontWeight: '600',
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    secTitle: {
        color: colors.white,
        fontWeight: 600,
        fontSize: 16,
    },
    logoBox: {
        width: '100%',
        height: Dimensions.get('window').height / 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '70%',
        height: '70%',
    },
    inputBox: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 37,
        paddingTop: 20,
    },
    titleInput: {
        color: colors.inputBackground,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    inputIconStyle: {
        color: colors.inputIcon,
    },
    input: {
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
    buttonBox: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
        paddingBottom: 30,
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
});
