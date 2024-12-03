# Projeto de Backend e Frontend com TypeScript, SQLite e React

Este projeto é uma aplicação full-stack composta por um backend em TypeScript usando SQLite e um frontend em React. O projeto inclui funcionalidades básicas de autenticação, registro de usuário e um CRUD simples.

## Estrutura do Projeto

### Estrutura de Pastas

/backend-project |-- /frontend # Frontend da aplicação (React) | |-- /src # Fonte do frontend | |-- package.json # Dependências e scripts do frontend | |-- tsconfig.json # Configuração do TypeScript para o frontend |-- /backend # Backend da aplicação (Node.js + TypeScript) | |-- /src # Fonte do backend | |-- dbSetup.ts # Script para configurar o banco de dados SQLite | |-- package.json # Dependências e scripts do backend | |-- tsconfig.json # Configuração do TypeScript para o backend |-- README.md # Este arquivo de documentação
## Tecnologias Utilizadas

- **Backend**: Node.js, TypeScript, SQLite
- **Frontend**: React, TypeScript
- **Bibliotecas**:
  - `express` para o backend
  - `sqlite3` e `sqlite` para a integração com o banco de dados
  - `axios` para chamadas HTTP no frontend
  - `react-router-dom` para navegação no frontend
  - `jsonwebtoken` para autenticação JWT

## Funcionalidades

### Backend

1. **Estrutura MVC**: O backend segue a arquitetura MVC com camadas de `Controller`, `Routes`, `Models`, `Repositories`, e `Services`.
2. **Banco de Dados SQLite**: Configurado e inicializado com dados de teste usando o arquivo `dbSetup.ts`.
3. **Autenticação**: Implementada com JWT para autenticar usuários.
4. **CRUD Básico**: Implementado em um `Crud.tsx` para manipular dados no banco de dados.
5. **Servidor Express**: Configurado para servir as rotas de autenticação e outras operações.

### Frontend

1. **Páginas**:
   - **Login**: Página para autenticação de usuários.
   - **Registro**: Página para criação de novos usuários.
   - **Dashboard**: Página inicial após o login.
   - **CRUD**: Interface para executar operações CRUD.

2. **React Router**: Utilizado para navegação entre as páginas.
3. **Axios**: Utilizado para fazer requisições HTTP para o backend.

## Como Rodar o Projeto

### 1. Configuração do Backend

- Navegue até a pasta `backend`:

```bash
cd backend-project/backend

Instale as dependências:
bash
Copiar código
npm install
Configure o banco de dados com dados de teste:
bash
Copiar código
npm run setup-db
Inicie o servidor do backend:
bash
Copiar código
npm start
2. Configuração do Frontend
Navegue até a pasta frontend:
bash
Copiar código
cd backend-project/frontend
Instale as dependências:
bash
Copiar código
npm install
Inicie o servidor de desenvolvimento do frontend:
bash
Copiar código
npm start
3. Testando a Aplicação
Acesse a aplicação frontend em http://localhost:3000.
Teste as rotas de login, registro e operações CRUD.
Explicação do Código
Backend
dbSetup.ts
Este arquivo configura o banco de dados SQLite, criando uma tabela users e inserindo dados de teste.

typescript
Copiar código
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setupDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  await db.run(`
    INSERT INTO users (username, email, password)
    VALUES
      ('user1', 'user1@example.com', 'password123'),
      ('user2', 'user2@example.com', 'password456');
  `);

  console.log('Banco de dados configurado com dados de teste!');
  await db.close();
}

setupDatabase().catch((err) => {
  console.error('Erro ao configurar o banco de dados:', err);
});
Auth Controller
Este controller lida com as rotas de autenticação.

typescript
Copiar código
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const newUser = await UserService.createUser(username, email, password);
      res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
Frontend
Register Component
O componente de registro coleta os dados do usuário e os envia para o backend usando axios.

typescript
Copiar código
import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      setMessage(`Registro bem-sucedido: ${response.data.message}`);
      setFormData({ username: '', email: '', password: '' });
    } catch (error: any) {
      setMessage(`Erro: ${error.response?.data?.message || 'Erro desconhecido'}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Usuário</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="username" placeholder="Nome de Usuário" value={formData.username} onChange={handleChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Registrar</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    backgroundColor: '#007BFF',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#333',
  },
};

export default Register;
Conclusão
Este projeto inclui um backend com um banco de dados SQLite e um frontend em React. A integração entre as partes foi feita de forma que você possa iniciar e testar as funcionalidades de registro, login e CRUD.