import { Request, Response } from 'express';
import * as contractService from '../services/contractService';

export const createContract = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Create Contract - Request Body:', req.body); // Log da entrada

    const { clientId, architectId, description } = req.body;
    const contract = await contractService.createContract(clientId, architectId, description);

    console.log('Create Contract - Response:', contract); // Log da saída
    res.status(201).json(contract);
  } catch (error) {
    console.error('Create Contract - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllContracts = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log('Get All Contracts - Request Received'); // Log indicando início da operação

    const contracts = await contractService.getAllContracts();

    console.log('Get All Contracts - Response:', contracts); // Log da saída
    res.status(200).json(contracts);
  } catch (error) {
    console.error('Get All Contracts - Error:', error); // Log do erro
    res.status(500).json({ message: 'Internal server error' });
  }
};
