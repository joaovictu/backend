import { db } from '../config/database';
import { User } from '../models/User';

export class UserRepository {
  static async findByUsername(username: string): Promise<User | undefined> {
    const database = await db;
    return database.get<User>('SELECT * FROM users WHERE username = ?', [username]);
  }

  static async create(user: User): Promise<void> {
    const database = await db;
    await database.run('INSERT INTO users (username, password) VALUES (?, ?)', [
      user.username,
      user.password,
    ]);
  }
}
