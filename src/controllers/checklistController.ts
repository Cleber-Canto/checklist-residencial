import { Request, Response } from 'express';
import * as checklistService from '../services/checklistService';

export const createChecklist = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Create Checklist - Request Body:', req.body); // Log da entrada

    const { contractId, tasks } = req.body;
    const checklist = await checklistService.createChecklist(contractId, tasks);

    console.log('Create Checklist - Response:', checklist); // Log da saída
    res.status(201).json(checklist);
  } catch (error) {
    console.error('Create Checklist - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllChecklists = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log('Get All Checklists - Request Received'); // Log indicando início da operação

    const checklists = await checklistService.getAllChecklists();

    console.log('Get All Checklists - Response:', checklists); // Log da saída
    res.status(200).json(checklists);
  } catch (error) {
    console.error('Get All Checklists - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
