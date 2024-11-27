// src/types/customRequest.ts
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string; // ou outros campos que você deseja adicionar
  };
}
