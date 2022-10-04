import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
// import { JwtPayload } from 'jsonwebtoken';
// import { object } from 'prop-types';
import BcryptService from '../services/utils/BCriptService';
import UserService from '../services/user';

const tokenJWT = process.env.JWT_SECRET || 'jwt_secret';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public Login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await this.userService.Login(email, password);
    const token = jwt.sign({ data: user }, tokenJWT);

    const checkPassword = BcryptService.compare(user.password, password);
    console.log(user.password);
    console.log(password);
    console.log(checkPassword);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Erro' });
    }

    return res.status(200).json({ token });
  };

  public role = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    if (typeof authorization === 'string') {
      const decript: string | jwt.JwtPayload | null = jwt.decode(authorization);
      if (decript && typeof decript === 'object') {
        const { role } = decript.data;
        return res.status(200).json({ role });
      }
    }
    return res.status(404).json({ message: 'error' });
  };
}
