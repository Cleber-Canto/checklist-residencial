import { Request, Response } from 'express';
import { registerClient } from '../modules/client/usecases/registerClient';
import { registerArchitect } from '../modules/architect/usecases/registerArchitect';
import { registerAdmin } from '../modules/user/usecases/registerAdmin';
import { loginUser } from '../modules/user/usecases/loginUser';

export const registerClientController = async (req: Request, res: Response) => {
  try {
    console.log('Register Client - Request Body:', req.body);

    const { username, password } = req.body;
    const result = await registerClient(username, password);

    console.log('Register Client - Success:', result);
    res.status(201).json({ message: 'Cliente registrado com sucesso!', user: result });
  } catch (error: any) {
    console.error('Register Client - Error:', error.message);

    if (error.message.includes('já está em uso')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
};

export const registerArchitectController = async (req: Request, res: Response) => {
  try {
    console.log('Register Architect - Request Body:', req.body); // Log da entrada

    const { username, password, specialtyId } = req.body;
    const result = await registerArchitect(username, password, specialtyId);

    console.log('Register Architect - Response:', result); // Log da saída
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Register Architect - Error:', error.message); // Agora o TypeScript aceita.
      res.status(400).json({ message: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
};

export const registerAdminController = async (req: Request, res: Response) => {
  try {
    console.log('Register Admin - Request Body:', req.body); // Log da entrada

    const { username, password } = req.body;
    const result = await registerAdmin(username, password);

    console.log('Register Admin - Response:', result); // Log da saída
    res.status(201).json(result);
  } catch (error) {
    console.error('Register Admin - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    console.log('Login User - Request Body:', req.body); // Log da entrada

    const { username, password } = req.body;
    const result = await loginUser(username, password);

    console.log('Login User - Response:', result); // Log da saída
    res.status(200).json(result);
  } catch (error) {
    console.error('Login User - Error:', error); // Log do erro
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
