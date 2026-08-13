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

export default function RegisterPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const [erroAtivo, setErroAtivo] = useState({ type: '', message: '' });

    const handleResgiter = async () => {
        const validation = validateRegister(name, email, password);

        if (validation.type) {
            // Salva o erro no estado para ativar o retorno visual
            setErroAtivo({ type: validation.type, message: validation.message });
            return;
        }
        //Limpa os erros
        setErroAtivo({ type: '', message: '' });
        // Função para limpar o erro visual assim que o usuário digita no campo
        function handleTextChange(
            texto: string,
            setter: (v: string) => void,
            campo: 'name' | 'email' | 'password',
        ) {
            //texto: string - é o texto atualizado que o usuário acabou de digitar;
            //setter: (v: string) => void - a parte que recebe como parâmetro uma função de atualização do estado,
            //significa: "uma função que aceita uma string como argumento e não retorna nada", isso permite reutilizar a mesma lógica para os 3 inputs;
            //setter(texto) - Significa que: se o usuário digitou no campo de e-mail, o setter(texto) vira setEmail(texto)
            setter(texto);

            const erroPertenceAoCampo =
                (campo === 'name' && erroAtivo.type === validation.type) ||
                (campo === 'email' && erroAtivo.type === validation.type) ||
                (campo === 'password' && erroAtivo.type === validation.type);
        }

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
            colors={[colors.lightBackground, colors.lightBackgroundSec]}
            start={{ x: 0.85, y: 0.85 }}
            end={{ x: 0.15, y: 0.15 }}
            style={style.container}>
            <KeyboardAvoidingView style={style.keyBoardContainer} behavior="height">
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
                                keyboardType="default"
                                value={name}
                                onChangeText={setName}
                                icon={
                                    <MaterialIcons
                                        name="create"
                                        style={style.inputIconStyle}
                                        size={iconSizes.meddium}
                                    />
                                }
                            />

                            <Text style={style.titleInput}>ENDEREÇO DE E-MAIL</Text>

                            <Input
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                icon={
                                    <MaterialIcons
                                        name="email"
                                        style={style.inputIconStyle}
                                        size={iconSizes.meddium}
                                    />
                                }
                            />

                            <Text style={style.titleInput}>SENHA</Text>

                            <Input
                                keyboardType="default"
                                value={password}
                                onChangeText={setPassword}
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
        paddingBottom: 80,
    },
    viewContainer: {
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
        color: colors.primary,
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
        height: Dimensions.get('window').height / 4,
        alignItems: 'flex-start',
        paddingHorizontal: 37,
        paddingTop: 30,
    },
    titleInput: {
        color: colors.inputBackground,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    inputIconStyle: {
        color: colors.inputIcon,
    },
    buttonBox: {
        width: '100%',
        height: Dimensions.get('window').height / 5,
        alignItems: 'center',
        marginTop: 100,
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
