import { Request, Response } from 'express';
import * as userService from '../services/clientService';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Create User - Request Body:', req.body); // Log da entrada

    const { username, password, role } = req.body;
    const newUser = await userService.createUser(username, password, role);

    console.log('Create User - Response:', newUser); // Log da saída
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Create User - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Get User By ID - Request Params:', req.params); // Log da entrada

    const id = req.params.id;
    const user = await userService.getUserById(id);

    if (user) {
      console.log('Get User By ID - Response:', user); // Log da saída
      res.status(200).json(user);
    } else {
      console.warn('Get User By ID - Warning: User not found for ID', id); // Log de aviso
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get User By ID - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log('Get All Users - Request Received'); // Log indicando início da operação

    const users = await userService.getAllUsers();

    console.log('Get All Users - Response:', users); // Log da saída
    res.status(200).json(users);
  } catch (error) {
    console.error('Get All Users - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
