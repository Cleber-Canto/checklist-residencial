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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../utils/prisma/prismaClient"));
const client_1 = require("@prisma/client");
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';
// Função para login
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Tentativa de login: username = ${username}`);
    // Buscar o usuário no banco de dados
    const user = yield prismaClient_1.default.user.findUnique({
        where: { username },
    });
    if (!user) {
        console.error(`Usuário não encontrado: ${username}`);
        throw new Error('Usuário não encontrado');
    }
    // Verificar se a senha está correta
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password || ''); // Certifique-se de que a senha não seja undefined
    if (!isPasswordValid) {
        console.error('Senha incorreta');
        throw new Error('Senha incorreta');
    }
    // Gerar o token JWT
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
    console.log(`Login bem-sucedido: username = ${username}, userId = ${user.id}, role = ${user.role}`);
    return { token, userId: user.id, role: user.role };
});
exports.login = login;
// Função para registrar novo usuário
const register = (username_1, password_1, ...args_1) => __awaiter(void 0, [username_1, password_1, ...args_1], void 0, function* (username, password, role = client_1.Role.CLIENT) {
    console.log(`Tentativa de registro: username = ${username}, role = ${role}`);
    // Verificar se o nome de usuário já existe
    const existingUser = yield prismaClient_1.default.user.findUnique({
        where: { username },
    });
    if (existingUser) {
        console.error(`Nome de usuário já está em uso: ${username}`);
        throw new Error('Nome de usuário já está em uso');
    }
    // Criptografar a senha
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Criar o usuário no banco de dados
    const newUser = yield prismaClient_1.default.user.create({
        data: {
            username,
            password: hashedPassword,
            role,
        },
    });
    console.log(`Usuário registrado com sucesso: username = ${username}, role = ${role}`);
    return newUser;
});
exports.register = register;
// Função para buscar todos os usuários
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Buscando todos os usuários');
    const users = yield prismaClient_1.default.user.findMany();
    console.log(`Total de usuários encontrados: ${users.length}`);
    return users;
});
exports.getAllUsers = getAllUsers;
// Função para editar usuário
const updateUser = (id, username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Tentativa de atualização de usuário: id = ${id}, username = ${username}, role = ${role}`);
    // Buscar o usuário no banco de dados
    const existingUser = yield prismaClient_1.default.user.findUnique({
        where: { id },
    });
    if (!existingUser) {
        console.error(`Usuário não encontrado: id = ${id}`);
        throw new Error('Usuário não encontrado');
    }
    // Criar objeto de dados a serem atualizados
    const dataToUpdate = {};
    if (username) {
        dataToUpdate.username = username;
    }
    if (password) {
        dataToUpdate.password = yield bcryptjs_1.default.hash(password, 10);
    }
    if (role) {
        dataToUpdate.role = role;
    }
    // Atualizar o usuário no banco de dados
    const updatedUser = yield prismaClient_1.default.user.update({
        where: { id },
        data: dataToUpdate,
    });
    console.log(`Usuário atualizado com sucesso: id = ${id}, username = ${updatedUser.username}, role = ${updatedUser.role}`);
    return updatedUser;
});
exports.updateUser = updateUser;
// Função para deletar usuário
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Tentativa de exclusão de usuário: id = ${id}`);
    // Buscar o usuário no banco de dados
    const existingUser = yield prismaClient_1.default.user.findUnique({
        where: { id },
    });
    if (!existingUser) {
        console.error(`Usuário não encontrado: id = ${id}`);
        throw new Error('Usuário não encontrado');
    }
    // Deletar o usuário no banco de dados
    yield prismaClient_1.default.user.delete({
        where: { id },
    });
    console.log(`Usuário deletado com sucesso: id = ${id}`);
});
exports.deleteUser = deleteUser;
