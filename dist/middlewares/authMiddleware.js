"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Bearer token
    if (!token)
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded; // Agora o TypeScript reconhece a propriedade user
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
};
exports.authenticateToken = authenticateToken;
