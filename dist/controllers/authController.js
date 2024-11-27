"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const authService_1 = require("../services/authService");
// Controlador para registrar novo usuário
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    try {
        const user = yield (0, authService_1.register)(username, password, role);
        res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
});
exports.registerUser = registerUser;
// Controlador para login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const { token, userId, role } = yield (0, authService_1.login)(username, password);
        res.status(200).json({ token, userId, role });
    }
    catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
});
exports.loginUser = loginUser;
// Controlador para buscar todos os usuários
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, authService_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
});
exports.getUsers = getUsers;
// Controlador para atualizar usuário
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // 'id' deve ser do tipo string
    const { username, password, role } = req.body;
    try {
        // Lógica para atualizar o usuário
        const updatedUser = yield (0, authService_1.updateUser)(id, username, password, role);
        return res.status(200).json({ message: 'Usuário atualizado com sucesso', updatedUser });
    }
    catch (error) {
        return res.status(400).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
});
exports.updateUserController = updateUserController;
// Controlador para deletar usuário
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, authService_1.deleteUser)(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    }
});
exports.deleteUserController = deleteUserController;
