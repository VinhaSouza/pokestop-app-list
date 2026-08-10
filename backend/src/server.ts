import express from "express";
import cors from "cors";
import pool from "./db";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "A api está funcionando!!"});
});

app.get("/users", async (req, res) => {
    console.log("ROTA users foi chamada");

    const result = await pool.query("SELECT * FROM users");
        
    res.json(result.rows);
});

app.post("/users", async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
        return res.status(409).json({message: "Este email já está cadastrado."});
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email", [name, email, hashedPassword]);
    res.status(201).json(result.rows[0]);
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const result = await pool.query("SELECT id AS id, name AS name, email AS email, password AS password FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
        return res.status(401).json({message: "Email ou senha incorretos",});
    };

    const user = result.rows[0];

    const passwordCorret = await bcrypt.compare(password, user.password);

    if (!passwordCorret) {
        return res.status(401).json({message: "Email ou senha incorretos",});
    };

    res.json({
        message: "Login realizado com sucesso!",
        user: {
            id: user.id,
            name: user.name,
            password: user.password,
        },
    });
});

app.listen(3000, () => {
    console.log("API funcionando na porta 3000!");
});