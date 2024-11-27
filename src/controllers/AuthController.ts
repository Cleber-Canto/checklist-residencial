import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { CustomRequest } from '../middlewares/authMiddleware';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Request Body:', req.body); // Log da entrada

    const { username, password, role } = req.body;
    const newUser = await userService.createUser(username, password, role);

    console.log('User Created:', newUser); // Log da saída
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error Creating User:', error); // Log do erro
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Login Request:', req.body); // Log da entrada

    const { username, password } = req.body;
    const { token, user } = await userService.authenticateUser(username, password);

    console.log('Login Successful:', { user, token }); // Log da saída
    res.json({ token, user });
  } catch (error) {
    console.error('Login Error:', error); // Log do erro
    res.status(401).json({ message: error instanceof Error ? error.message : 'Authentication failed' });
  }
};

export const getLoggedInUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    console.log('Request User ID:', req.userId); // Log da entrada

    const userId = req.userId;
    if (!userId) {
      console.log('Authentication Error: User ID missing'); // Log do erro
      res.status(400).json({ message: 'User not authenticated' });
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      console.log('User Not Found:', userId); // Log do caso "não encontrado"
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log('Logged-In User Data:', user); // Log da saída
    res.json(user);
  } catch (error) {
    console.error('Error Fetching Logged-In User:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
