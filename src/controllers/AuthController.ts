import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    await AuthService.register(username, password);
    res.status(201).send({ message: 'User registered successfully.' });
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const token = await AuthService.login(username, password);
    if (token) {
      res.send({ token });
    } else {
      res.status(401).send({ message: 'Invalid credentials.' });
    }
  }
}
