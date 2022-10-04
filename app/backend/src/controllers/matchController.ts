import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import MatchService from '../services/matches';

const tokenJWT = process.env.JWT_SECRET || 'jwt_secret';

export default class TeamController {
  constructor(private matchService = new MatchService()) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  public changeProgress = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    try {
      jwt.verify(authorization as string, tokenJWT);

      const saveMatch = await this.matchService.changeProgress(req.body);
      return res.status(201).json(saveMatch);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };

  public finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };
}
