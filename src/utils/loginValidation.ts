export const validateLogin = (email: string, password: string) => {
    const emailEmpty = !email.trim();
    const passwordEmpty = !password;
    const emailInvalid = !emailEmpty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordInvalid = !passwordEmpty && password.length < 6;

    let emailError = '';
    let passwordError = '';

    if (emailEmpty) {
        emailError = 'Digite seu e-mail.';
    } else if (emailInvalid) {
        emailError = 'Digite um e-mail válido';
    }
    if (passwordEmpty) {
        passwordError = 'Digite sua senha.';
    } else if (passwordInvalid) {
        passwordError = 'A senha deve conter no mínimo 6 caracteres.';
    }

    return {
        emailError,
        passwordError,
    };
};
