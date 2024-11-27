// dtos/userDtos.ts

// DTO para criação de usuário
export interface CreateUserDto {
    username: string;   // Nome de usuário
    password: string;   // Senha do usuário
    role: 'CLIENT' | 'ARCHITECT'; // Função do usuário (pode ser adaptado conforme necessário)
}

// DTO para atualização de usuário
export interface UpdateUserDto {
    username?: string;  // Nome de usuário (opcional)
    password?: string;  // Senha do usuário (opcional)
    role?: 'CLIENT' | 'ARCHITECT'; // Função do usuário (opcional)
}

// DTO para resposta de usuário
export interface UserDto {
    id: number;         // ID do usuário
    username: string;   // Nome de usuário
    role: 'CLIENT' | 'ARCHITECT'; // Função do usuário
}

// DTO para mensagens de erro
export interface ErrorDto {
    message: string;    // Mensagem de erro
}
