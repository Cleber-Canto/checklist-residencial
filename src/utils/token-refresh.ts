import { generateToken } from './token';

export function generateRefreshToken(payload: object): string {
  return generateToken(payload, '7d');
}
