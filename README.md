my-architecture-project/
├── prisma/
│   ├── schema.prisma       # Esquema do Prisma para definição de models e tabelas do BD
│   └── migrations/         # Diretório de migrações do Prisma
├── src/
│   ├── controllers/
│   │   ├── projectController.ts    # Controlador para projetos e fases
│   │   ├── fileController.ts       # Controlador para upload de arquivos
│   │   └── emailController.ts      # Controlador para envio de emails
│   ├── services/
│   │   ├── emailService.ts         # Serviço de envio de emails
│   │   ├── fileService.ts          # Serviço de manipulação de arquivos (Excel/PDF)
│   │   └── cronService.ts          # Serviço para rodar cron jobs
│   ├── routes/
│   │   ├── projectRoutes.ts        # Rotas para projetos e fases
│   │   ├── fileRoutes.ts           # Rotas para upload de arquivos
│   │   └── emailRoutes.ts          # Rotas para envio de emails
│   ├── middlewares/
│   │   └── authMiddleware.ts       # Middleware para autenticação
│   ├── utils/
│   │   └── prismaClient.ts         # Configuração do cliente Prisma
│   ├── app.ts                      # Arquivo principal para inicializar o app Express
│   ├── server.ts                   # Servidor que inicia a aplicação
├── uploads/                        # Diretório de armazenamento de arquivos enviados
│   ├── exemplo.pdf                 # Arquivos PDF enviados
│   ├── exemplo.xlsx                # Arquivos Excel gerados
├── Dockerfile                      # Configuração Docker
├── docker-compose.yml              # Docker Compose para subir o projeto com Postgres
├── package.json                    # Dependências do projeto
├── tsconfig.json                   # Configurações do TypeScript
└── README.md                       # Documentação do projeto




sudo docker run --name checklist_residencial_novo -p 5434:5432 -e POSTGRES_PASSWORD=nova_senha -e POSTGRES_USER=postgres -d postgres


O erro que você está recebendo indica que já existe um container com o nome `checklist_residencial_novo` em execução, o que impede que você crie um novo container com o mesmo nome.

Aqui estão os passos para matar e remover todos os containers e começar novamente com o comando desejado:

### 1. **Listar todos os containers em execução**

Primeiro, verifique todos os containers em execução com:

```bash
sudo docker ps
```

### 2. **Parar e remover todos os containers em execução**

Para parar todos os containers em execução, use o seguinte comando:

```bash
sudo docker stop $(sudo docker ps -q)
```

Em seguida, para remover todos os containers (incluindo os que não estão em execução), execute:

```bash
sudo docker rm $(sudo docker ps -aq)
```

### 3. **Verificar se o nome do container está disponível**

Agora, verifique se o nome `checklist_residencial_novo` está disponível para ser reutilizado:

```bash
sudo docker ps -a
```

Se o container `checklist_residencial_novo` ainda aparecer na lista, mesmo depois de você ter removido os containers, você pode forçar a remoção do container específico com:

```bash
sudo docker rm -f checklist_residencial_novo
```

### 4. **Rodar o comando `docker run` novamente**

Depois de parar e remover todos os containers, você pode tentar rodar o comando novamente:

```bash
sudo docker run --name checklist_residencial -p 5434:5432 -e POSTGRES_PASSWORD=nova_senha -e POSTGRES_USER=postgres -d postgres
```

Isso deve funcionar agora, já que o nome `checklist_residencial_novo` estará disponível.


### 5. Rodar as migrações do Prisma:
npx prisma migrate dev

### 6. Rodar a aplicação:
npm run dev


Requisitos Funcionais - Checklist Residencial

    Tipos de Usuário:
        A aplicação deve ter dois tipos de usuário: cliente e admin.
        O cliente pode ser responsável pelo checklist de sua residência, enquanto o admin gerencia e configura os projetos.

    Login e Autenticação:
        Deve ser possível realizar o login usando CPF e Senha.

    CRUD dos Usuários (Entregadores e Clientes):
        Admin deve poder realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) para entregadores (ou outros tipos de usuários) e clientes.

    CRUD de Projetos (Checklists):
        O admin deve ser capaz de criar, editar e excluir checklists de arquitetura residencial.
        O cliente pode visualizar e editar seu checklist (apenas informações que ele gerenciou ou que tenha permissão para alterar).

    Checklist de Tarefas:
        O sistema deve permitir que o cliente marque a conclusão de tarefas dentro de seu checklist de construção ou reforma.

    Marcar Status de Tarefas:
        O cliente pode marcar uma tarefa como "Disponível para execução" ou "Em progresso", com base na fase de desenvolvimento da obra.
        Deve ser possível marcar uma tarefa como concluída ou pendente dentro do checklist.

    Foto como Comprovação de Conclusão:
        Para marcar uma tarefa como concluída, o cliente pode ser obrigado a enviar fotos do progresso ou da tarefa concluída, como um requisito para validar a execução.

    Listagem de Tarefas de um Cliente:
        Deve ser possível ao cliente listar todas as tarefas relacionadas ao seu checklist e verificar o progresso geral.

    Notificação de Atualização de Status:
        O sistema deve permitir que o cliente seja notificado a cada alteração no status das tarefas do seu checklist.

    Alteração de Senha de Usuário:

    O admin deve poder alterar a senha de qualquer usuário (cliente ou admin).
    O cliente pode alterar sua própria senha.

Regras de Negócio - Checklist Residencial

    Operações de CRUD de Checklists e Tarefas:
        Somente admin pode realizar operações de CRUD (criar, editar e excluir) sobre checklists de arquitetura e tarefas associadas.

    Envio de Foto para Conclusão:
        Para marcar uma tarefa como concluída, o cliente deve enviar uma foto comprovando o cumprimento da tarefa.

    Alteração de Senha:
        Somente o admin pode alterar a senha de outros usuários (cliente ou admin).

    Visualização de Tarefas:
        Um cliente não deve poder visualizar o checklist ou tarefas de outros clientes.
        Apenas o admin pode ter acesso completo aos checklists de todos os clientes.

### Manual de Como Fazer as Requisições no Postman

Este manual fornecerá um guia passo a passo para realizar as requisições no Postman para o projeto que desenvolvemos. 

### 1. Registro de Cliente

**Método:** POST  
**URL:** `http://localhost:3000/api/users/registerClient`  
**Headers:**
- `Content-Type: application/json`

**Body (raw, JSON):**
```json
{
  "username": "cliente123",
  "password": "senha123"
}
```

**Resposta Esperada:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "user_id",
    "username": "cliente123",
    "role": "CLIENT",
    "createdAt": "2023-10-10T00:00:00.000Z",
    "updatedAt": "2023-10-10T00:00:00.000Z"
  }
}
```

### 2. Registro de Arquiteto

**Método:** POST  
**URL:** `http://localhost:3000/api/users/registerArchitect`  
**Headers:**
- `Content-Type: application/json`

**Body (raw, JSON):**
```json
{
  "username": "arquiteto123",
  "password": "senha123",
  "specialtyId": 1
}
```

**Resposta Esperada:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "user_id",
    "username": "arquiteto123",
    "role": "ARCHITECT",
    "specialtyId": 1,
    "createdAt": "2023-10-10T00:00:00.000Z",
    "updatedAt": "2023-10-10T00:00:00.000Z"
  }
}
```

### 3. Registro de Administrador

**Método:** POST  
**URL:** `http://localhost:3000/api/users/registerAdmin`  
**Headers:**
- `Content-Type: application/json`

**Body (raw, JSON):**
```json
{
  "username": "admin123",
  "password": "senha123"
}
```

**Resposta Esperada:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "user_id",
    "username": "admin123",
    "role": "ADMIN",
    "createdAt": "2023-10-10T00:00:00.000Z",
    "updatedAt": "2023-10-10T00:00:00.000Z"
  }
}
```

### 4. Login de Usuário

**Método:** POST  
**URL:** `http://localhost:3000/api/users/login`  
**Headers:**
- `Content-Type: application/json`

**Body (raw, JSON):**
```json
{
  "username": "usuario123",
  "password": "senha123"
}
```

**Resposta Esperada:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "user_id",
    "username": "usuario123",
    "role": "USER_ROLE",
    "createdAt": "2023-10-10T00:00:00.000Z",
    "updatedAt": "2023-10-10T00:00:00.000Z"
  }
}
```

### 5. Cadastro de Especialidade

**Método:** POST  
**URL:** `http://localhost:3000/api/specialties`  
**Headers:**
- `Content-Type: application/json`

**Body (raw, JSON):**
```json
{
  "name": "Estrutural"
}
```

**Resposta Esperada:**
```json
{
  "id": 1,
  "name": "Estrutural"
}
```

### 6. Listar Todas as Especialidades

**Método:** GET  
**URL:** `http://localhost:3000/api/specialties`  

**Resposta Esperada:**
```json
[
  {
    "id": 1,
    "name": "Estrutural"
  },
  {
    "id": 2,
    "name": "Elétrica"
  },
  {
    "id": 3,
    "name": "Hidráulica"
  }
]
```

### 7. Cadastro de Contrato

**Método:** POST  
**URL:** `http://localhost:3000/api/contracts`  
**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <seu_token>`

**Body (raw, JSON):**
```json
{
  "clientId": "id_do_cliente",
  "architectId": "id_do_arquiteto",
  "description": "Reforma completa"
}
```

**Resposta Esperada:**
```json
{
  "id": "contract_id",
  "clientId": "id_do_cliente",
  "architectId": "id_do_arquiteto",
  "description": "Reforma completa",
  "createdAt": "2023-10-10T00:00:00.000Z",
  "updatedAt": "2023-10-10T00:00:00.000Z"
}
```

### 8. Listar Todos os Contratos

**Método:** GET  
**URL:** `http://localhost:3000/api/contracts`  
**Headers:**
- `Authorization: Bearer <seu_token>`

**Resposta Esperada:**
```json
[
  {
    "id": "contract_id_1",
    "clientId": "id_do_cliente_1",
    "architectId": "id_do_arquiteto_1",
    "description": "Reforma completa",
    "createdAt": "2023-10-10T00:00:00.000Z",
    "updatedAt": "2023-10-10T00:00:00.000Z"
  },
  {
    "id": "contract_id_2",
    "clientId": "id_do_cliente_2",
    "architectId": "id_do_arquiteto_2",
    "description": "Construção de nova casa",
    "createdAt": "2023-11-15T00:00:00.000Z",
    "updatedAt": "2023-11-15T00:00:00.000Z"
  }
]
```

### 9. Cadastro de Checklist

**Método:** POST  
**URL:** `http://localhost:3000/api/checklists`  
**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <seu_token>`

**Body (raw, JSON):**
```json
{
  "contractId": "id_do_contrato",
  "tasks": [
    {
      "name": "Inspeção inicial"
    }
  ]
}
```

**Resposta Esperada:**
```json
{
  "id": "checklist_id",
  "contractId": "id_do_contrato",
  "tasks": [
    {
      "id": "task_id",
      "name": "Inspeção inicial"
    }
  ],
  "createdAt": "2023-10-10T00:00:00.000Z",
  "updatedAt": "2023-10-10T00:00:00.000Z"
}
```

### 10. Listar Todos os Checklists

**Método:** GET  
**URL:** `http://localhost:3000/api/checklists`  
**Headers:**
- `Authorization: Bearer <seu_token>`

**Resposta Esperada:**
```json
[
  {
    "id": "checklist_id_1",
    "contractId": "id_do_contrato_1",
    "tasks": [
      {
        "id": "task_id_1",
        "name": "Inspeção inicial"
      }
    ],
    "createdAt": "2023-10-10T00:00:00.000Z",
    "updatedAt": "2023-10-10T00:00:00.000Z"
  },
  {
    "id": "checklist_id_2",
    "contractId": "id_do_contrato_2",
    "tasks": [
      {
        "id": "task_id_2",
        "name": "Preparação do terreno"
      }
    ],
    "createdAt": "2023-11-15T00:00:00.000Z",
    "updatedAt": "2023-11-15T00:00:00.000Z"
  }
]
```

### 11. Cadastro de Tarefa

**Método:** POST  
**URL:** `http://localhost:3000/api/tasks`  
**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <seu_token>`

**Body (raw, JSON):**
```json
{
  "checklistId": "id_do_checklist",
  "name": "Verificar fundação"
}
```

**Resposta Esperada:**
```json
{
  "id": "task_id",
  "checklistId": "id_do_checklist",
  "name": "Verificar fundação",
  "createdAt": "2023-10-10T00:00:00.000Z",
  "updatedAt": "2023-10-10T00:00:00.000Z"
}
```

Vamos completar a parte faltante e finalizar o manual das requisições no Postman.

### 12. Listar Tarefas por Checklist

**Método:** GET  
**URL:** `http://localhost:3000/api/tasks/:checklistId` (substitua `:checklistId` pelo ID do checklist)  
**Headers:**
- `Authorization: Bearer <seu_token>`

**Resposta Esperada:**
```json
[
  {
    "id": "task_id_1",
    "checklistId": "checklist_id_1",
    "name": "Inspeção inicial",
    "createdAt": "2023-10-10T00:00:00.000Z",
    "updatedAt": "2023-10-10T00:00:00.000Z"
  },
  {
    "id": "task_id_2",
    "checklistId": "checklist_id_1",
    "name": "Verificar fundação",
    "createdAt": "2023-11-15T00:00:00.000Z",
    "updatedAt": "2023-11-15T00:00:00.000Z"
  }
]
```

### 13. Adicionar Nova Permissão

**Método:** POST  
**URL:** `http://localhost:3000/api/permissions`  
**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <seu_token>`

**Body (raw, JSON):**
```json
{
  "name": "NEW_PERMISSION"
}
```

**Resposta Esperada:**
```json
{
  "id": "permission_id",
  "name": "NEW_PERMISSION"
}
```

### 14. Listar Todas as Permissões

**Método:** GET  
**URL:** `http://localhost:3000/api/permissions`  
**Headers:**
- `Authorization: Bearer <seu_token>`

**Resposta Esperada:**
```json
[
  {
    "id": "permission_id_1",
    "name": "CREATE"
  },
  {
    "id": "permission_id_2",
    "name": "READ"
  },
  {
    "id": "permission_id_3",
    "name": "UPDATE"
  },
  {
    "id": "permission_id_4",
    "name": "DELETE"
  },
  {
    "id": "permission_id_5",
    "name": "NEW_PERMISSION"
  }
]
```

### 15. Atribuir Permissão a um Usuário

**Método:** POST  
**URL:** `http://localhost:3000/api/user-permissions/assign`  
**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <seu_token>`

**Body (raw, JSON):**
```json
{
  "userId": "id_do_usuario",
  "permissionId": "id_da_permissao"
}
```

**Resposta Esperada:**
```json
{
  "id": "user_permission_id",
  "userId": "id_do_usuario",
  "permissionId": "id_da_permissao",
  "createdAt": "2023-10-10T00:00:00.000Z"
}
```

### 16. Listar Permissões de um Usuário

**Método:** GET  
**URL:** `http://localhost:3000/api/user-permissions/:userId` (substitua `:userId` pelo ID do usuário)  
**Headers:**
- `Authorization: Bearer <seu_token>`

**Resposta Esperada:**
```json
[
  {
    "id": "user_permission_id_1",
    "userId": "user_id",
    "permissionId": "permission_id_1",
    "createdAt": "2023-10-10T00:00:00.000Z"
  },
  {
    "id": "user_permission_id_2",
    "userId": "user_id",
    "permissionId": "permission_id_2",
    "createdAt": "2023-11-15T00:00:00.000Z"
  }
]
```

       