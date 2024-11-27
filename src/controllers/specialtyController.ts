import { Request, Response } from 'express';
import * as specialtyService from '../services/specialtyService';

export const createSpecialty = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Create Specialty - Request Body:', req.body); // Log da entrada

    const { name } = req.body;
    const specialty = await specialtyService.createSpecialty(name);

    console.log('Create Specialty - Response:', specialty); // Log da saída
    res.status(201).json(specialty);
  } catch (error) {
    console.error('Create Specialty - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllSpecialties = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log('Get All Specialties - Request Received'); // Log indicando início da operação

    const specialties = await specialtyService.getAllSpecialties();

    console.log('Get All Specialties - Response:', specialties); // Log da saída
    res.status(200).json(specialties);
  } catch (error) {
    console.error('Get All Specialties - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
