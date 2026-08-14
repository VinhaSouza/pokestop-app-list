export const validateRegister = (name: string, email: string, password: string) => {
    // Aqui são as validações:
    const nameEmpty = !name.trim();
    const emailEmpty = !email.trim();
    const passwordEmpty = !password;
    const emailInvalid = !emailEmpty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordInvalid = !passwordEmpty && password.length < 6;

    // Aqui são os tratamentos de erros:
    let nameError = '';
    let emailError = '';
    let passwordError = '';

    if (nameEmpty) {
        nameError = 'Digite seu nome ou apelido.';
    }
    if (emailEmpty) {
        emailError = 'Digite seu e-mail.';
    } else if (emailInvalid) {
        emailError = 'Digite um e-mail válido.';
    }
    if (passwordEmpty) {
        passwordError = 'Digite sua senha.';
    } else if (passwordInvalid) {
        passwordError = 'A senha deve conter no mínimo 6 caracteres.';
    }

    return {
        nameError,
        emailError,
        passwordError,
    };
};
