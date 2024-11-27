import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import  authRoutes  from './routes/authRoutes';
import specialtyRoutes from './routes/specialtyRoutes'; 
import clientRoutes from './routes/clientRoutes'; 
import architectRoutes from './routes/architectRoutes'; 
import contractRoutes from './routes/contractRoutes'; 
import checklistRoutes from './routes/checklistRoutes';
import taskRoutes from './routes/taskRoutes';
import userPermissionRoutes from './routes/userPermissionRoutes';
import permissionRoutes from './routes/permissionRoutes'

const app = express();

app.use(express.json());
app.use(cors());

// Rotas sem middleware global de autenticação
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/specialties', specialtyRoutes); 
app.use('/api/clients', clientRoutes); 
app.use('/api/architects', architectRoutes); 
app.use('/api/contracts', contractRoutes); 
app.use('/api/checklists', checklistRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/user-permissions', userPermissionRoutes);

export { app };
