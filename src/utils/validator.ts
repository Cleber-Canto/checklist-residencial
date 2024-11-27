import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUser = [
  // Validação do campo 'username'
  body('username')
    .isString().withMessage('Username deve ser uma string.')
    .isLength({ min: 3 }).withMessage('Username deve ter no mínimo 3 caracteres.'),

  // Validação do campo 'password'
  body('password')
    .isString().withMessage('Password deve ser uma string.')
    .isLength({ min: 6 }).withMessage('Password deve ter no mínimo 6 caracteres.'),

  // Middleware para verificar e retornar erros
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array().map((err: { param: any; msg: any; }) => ({
          field: err.param,
          message: err.msg,
        }))
      });
    }
    next();
  },
];
