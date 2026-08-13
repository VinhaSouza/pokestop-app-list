export const validateRegister = (name: string, email: string, password: string) => {
    let nameError = false;
    let emailError = false;
    let passwordError = false;
    let invalidEmailError = false;
    let invalidPassword = false;

    if (!name.trim()) {
        nameError = true;
    }
    if (!email.trim()) {
        emailError = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        invalidEmailError = true;
    }
    if (!password) {
        passwordError = true;
    }
    if (password.length < 6) {
        invalidPassword = true;
    }
    return {
        type: nameError
            ? 'Nome/Apelido'
            : emailError
              ? 'E-mail'
              : invalidEmailError
                ? 'E-mail inválido'
                : passwordError
                  ? 'Senha'
                  : invalidPassword
                    ? 'Senha inválida'
                    : '',
        message: nameError
            ? 'Digite o seu nome ou apelido.'
            : emailError
              ? 'Digite seu e-mail.'
              : invalidEmailError
                ? 'Digite um e-mail válido.'
                : passwordError
                  ? 'Digite sua senha.'
                  : invalidPassword
                    ? 'A senha deve conter no mínimo 6 caracteres.'
                    : '',
    };
};
