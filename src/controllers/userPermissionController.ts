import { Request, Response } from 'express';
import * as userPermissionService from '../services/userPermissionService';

export const assignPermission = async (req: Request, res: Response) => {
  try {
    console.log('Assign Permission - Request Body:', req.body); // Log da entrada

    const { userId, permissionId } = req.body;
    const userPermission = await userPermissionService.assignPermissionToUser(userId, permissionId);

    console.log('Assign Permission - Response:', userPermission); // Log da saída
    res.status(201).json(userPermission);
  } catch (error) {
    console.error('Assign Permission - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserPermissions = async (req: Request, res: Response) => {
  try {
    console.log('Get User Permissions - Request Params:', req.params); // Log dos parâmetros

    const { userId } = req.params;
    const permissions = await userPermissionService.getUserPermissions(userId);

    console.log('Get User Permissions - Response:', permissions); // Log da saída
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Get User Permissions - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
