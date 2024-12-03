import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setupDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  // Criar uma tabela de exemplo
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  // Inserir dados de teste
  await db.run(`
    INSERT INTO users (username, email, password)
    VALUES
      ('user1', 'user1@example.com', 'password123'),
      ('user2', 'user2@example.com', 'password456');
  `);

  console.log('Banco de dados configurado com dados de teste!');
  await db.close();
}

// Executar a configuração
setupDatabase().catch((err) => {
  console.error('Erro ao configurar o banco de dados:', err);
});
