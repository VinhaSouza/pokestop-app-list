import express from 'express';
import cors from 'cors';
import pool from './db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'A api está funcionando!!' });
});

app.get('/users', async (req, res) => {
    console.log('ROTA users foi chamada');

    const result = await pool.query('SELECT id, name, email FROM users');

    res.json(result.rows);
});

app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'Nome, e-mail e senha devem ser textos.' });
    }

    if (!name.trim() || !email.trim() || !password.trim()) {
        return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
    }

    const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Expressão regular Regex, significa: começo(^) -> algum texto ([^\s@]) -> + @ -> algum texto ([^\s@]) -> + . -> algum texto [^\s@] -> fim ($)

    if (!emailRules.test(email)) {
        return res.status(400).json({ error: 'E-mail inválido.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
        return res.status(409).json({ message: 'Este email já está cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword],
    );
    res.status(201).json(result.rows[0]);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query(
        'SELECT id, name, email, password FROM users WHERE email = $1',
        [email],
    );

    if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const user = result.rows[0];

    const passwordCorret = await bcrypt.compare(password, user.password);

    if (!passwordCorret) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({
        message: 'Login realizado com sucesso!',
        user: {
            id: user.id,
            name: user.name,
        },
        token,
    });
});

app.get('/cart', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, product_id, quantity FROM cart_items WHERE user_id = $1',
            [req.userId],
        );
        res.json(result.rows);
    } catch (error) {
        console.log('Erro ao buscar carrinho:', error);

        res.status(500).json({
            message: 'Erro ao buscar o carrinho.',
        });
    }
});

app.post('/cart', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    if (typeof productId !== 'string' || typeof quantity !== 'number') {
        return res.status(400).json({
            message: 'Produto e quantidade são obrigatórios.',
        });
    }
    if (quantity <= 0) {
        return res.status(400).json({
            message: 'A quantidade deve ser maior que zero.',
        });
    }
    const result = await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity, update_at = CURRENT_TIMESTAMP RETURNING id, product_id, quantity',
        [req.userId, productId, quantity],
    );

    res.status(201).json(result.rows[0]);
});

app.patch('/cart/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (typeof productId !== 'string' || typeof quantity !== 'number') {
        return res.status(400).json({
            message: 'Produto e quantidade são obrigatórios.',
        });
    }
    if (quantity <= 0) {
        return res.status(400).json({
            message: 'A quantidade deve ser maior que zero.',
        });
    }
    try {
        const result = await pool.query(
            'UPDATE cart_items SET quantity = $1, update_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3 RETURNING id, product_id, quantity',
            [quantity, req.userId, productId],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Produto não encontrado no carrinho.',
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.log('Erro ao atualizar o carrinho:', error);

        res.status(500).json({
            message: 'Erro ao atualizar o carrinho',
        });
    }
});

app.delete('/cart/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING id, product_id,quantity',
            [req.userId, productId],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Produto não encontrado no carrinho.',
            });
        }

        res.json({
            message: 'Produto removido do carrinho.',
            item: result.rows[0],
        });
    } catch (error) {
        console.log('Erro ao remover produto do carrinho:', error);

        res.status(500).json({
            message: 'Erro ao remover produto do carrinho.',
        });
    }
});

app.listen(process.env.DB_PORTBACKEND, () => {
    console.log('A API está rodando com sucesso!');
});
