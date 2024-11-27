import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors/AppError';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err); // Log do erro em produção
  return res.status(500).json({ message: 'An unexpected error occurred' });
};
