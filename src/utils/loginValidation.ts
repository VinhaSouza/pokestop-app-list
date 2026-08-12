import { Alert } from "react-native";

export const validateLogin = (email: string, password: string) => {
    if (!email.trim()) {
        Alert.alert("E-mail", "Digite seu e-mail.");
        return false;
    };
    if (!email.includes("@")) {
        Alert.alert("E-mail inválido", "Digite um e-mail válido.");
        return false;
    };
    if (!password) {
        Alert.alert("Senha", "Digite sua senha.")
        return false;
    };
    if (password.length < 6) {
        Alert.alert("Senha inválida", "A senha deve ter pelo menos 6 caracteres.");
        return false;
    }
    return true;
};