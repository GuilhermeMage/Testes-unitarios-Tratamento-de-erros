import express from "express";
import { logger } from "../utils/logger.js";

const router = express.Router();

const produtos = [
    { id: 1, nome: "Teclado", preco: 100 },
    { id: 2, nome: "Mouse", preco: 50 },
];

router.get("/", (req, res) => {
    logger.info("Listando produtos");

    res.json(produtos);
});

router.post("/", (req, res, next) => {
    try {
        const { nome, preco } = req.body;

        if (!nome || !preco) {
            const erro = new Error("Nome e preço são obrigatórios");
            erro.statusCode = 400;
            throw erro;
        }

        const novoProduto = {
            id: produtos.length + 1,
            nome,
            preco,
        };

        produtos.push(novoProduto);

        logger.info({
            message: "Produto criado",
            produto: novoProduto,
        });

        res.status(201).json(novoProduto);
    } catch (error) {
        next(error);
    }
});

router.get("/erro", (req, res, next) => {
    const erro = new Error("Erro simulado de banco de dados");
    erro.statusCode = 500;

    next(erro);
});

export default router;