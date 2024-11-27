import { Request, Response } from 'express';
import * as permissionService from '../services/permissionService';

export const createPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Create Permission - Request Body:', req.body); // Log da entrada

    const { name } = req.body;
    const permission = await permissionService.addPermission(name);

    console.log('Create Permission - Response:', permission); // Log da saída
    res.status(201).json(permission);
  } catch (error) {
    console.error('Create Permission - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllPermissions = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log('Get All Permissions - Request Received'); // Log indicando início da operação

    const permissions = await permissionService.getAllPermissions();

    console.log('Get All Permissions - Response:', permissions); // Log da saída
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Get All Permissions - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
