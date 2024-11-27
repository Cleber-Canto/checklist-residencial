import { Request, Response } from 'express';
import * as userService from '../services/architectService';

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('Request Body:', req.body); // Log da entrada

    const { username, password, role } = req.body;
    const newUser = await userService.createUser(username, password, role);

    console.log('Response Data:', newUser); // Log da saída
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log('Request Params:', id); // Log da entrada

    const user = await userService.getUserById(id);

    if (user) {
      console.log('Response Data:', user); // Log da saída
      res.status(200).json(user);
    } else {
      console.log('Response Data: User not found'); // Log do caso "não encontrado"
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    console.log('Fetching all users'); // Log da ação

    const users = await userService.getAllUsers();

    console.log('Response Data:', users); // Log da saída
    res.status(200).json(users);
  } catch (error) {
    console.error('Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
