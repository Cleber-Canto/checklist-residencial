import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const add = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Add Task - Request Body:', req.body); // Log da entrada

    const { checklistId, name } = req.body;
    const task = await taskService.addTask(checklistId, name);

    console.log('Add Task - Response:', task); // Log da saída
    res.status(201).json(task);
  } catch (error) {
    console.error('Add Task - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getByChecklist = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Get Tasks By Checklist - Request Params:', req.params); // Log da entrada

    const { checklistId } = req.params;
    const tasks = await taskService.getTasksByChecklist(checklistId);

    console.log('Get Tasks By Checklist - Response:', tasks); // Log da saída
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Get Tasks By Checklist - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
