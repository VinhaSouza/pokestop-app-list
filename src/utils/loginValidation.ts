export const validateLogin = (email: string, password: string) => {
    let emailError = false; //<- Cada validação tem sua própria variável para uma não substituir a outra.
    let passwordError = false; // Começam sem saber se tem um erro.
    let invalidEmail = false;
    let invalidPassword = false;

    if (!email.trim()) {
        emailError = true;
    }
    if (!email.includes("@")) {
        invalidEmail = true;
    }
    if (!password) {
       passwordError = true;
    }
    if (password.length < 6) {
        invalidPassword = true;
    }
    return {
        type: // condição ? resultadoSeVerdadeiro : resultadoSeFalso
            emailError ? "E-mail" : 
            passwordError ? "Senha" :
            invalidEmail ? "E-mail inválido" :
            invalidPassword ? "Senha inválida" : 
            "", // Significa que não tem erro
        message: 
           emailError ? "Digite seu E-mail." : 
           passwordError ? "Digite sua senha." :
           invalidEmail ? "Digite um e-mail válido." :
           invalidPassword ? "A senha deve conter no mínimo 6 caracteres." :
           "", // Significa que não tem erro
        }
    };