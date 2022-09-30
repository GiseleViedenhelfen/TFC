import { Request, Response, NextFunction } from 'express';
import User from '../database/models/modelUser';

export default class LoginMiddle {
  public model = User;
  public LoginValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const login = await this.model.findOne({ where: { email }, raw: true });
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!login) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}
