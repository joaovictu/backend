import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';

export class AuthService {
  static async register(username: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserRepository.create({ username, password: hashedPassword });
  }

  static async login(username: string, password: string): Promise<string | null> {
    const user = await UserRepository.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    }
    return null;
  }
}
