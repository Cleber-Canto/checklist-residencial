"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Rota para registrar novo usuário
router.post('/register', authController_1.registerUser);
// Rota para login
router.post('/login', authController_1.loginUser);
// Rota para buscar todos os usuários
router.get('/users', authController_1.getUsers);
// Rota para atualizar usuário
router.put('/users/:id', authController_1.updateUserController);
// Rota para deletar usuário
router.delete('/users/:id', authController_1.deleteUserController);
exports.default = router;
