import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Obtém o token enviado pelo cliente através do header authorization
    const authorization = req.headers.authorization;

    // Se o cliente não enviar o token, impede o acesso a rota protegida
    if (!authorization) {
        return res.status(401).json({
            message: 'Token não encontrado.',
        });
    }
    // Remove o "Bearer" do início e mantém somente o JWT que será utilizado na validação
    const token = authorization.replace(/^Bearer\s+/i, '');

    try {
        // Verifica se o token é válido usando a chave secreta do servidor e também se o token está expirado
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        console.log('Encontrado Token válido:', decoded);

        // Permite que a requisição continue para a rota protegida
        next();
    } catch (error) {
        // Se o token for inválido, expirado ou alterado, a requisiçãoé interrompida e retorna erro de autenticação
        console.log('Erro ao validar o token:', error);

        return res.status(401).json({
            message: 'Token inválido ou expirado.',
        });
    }
}
