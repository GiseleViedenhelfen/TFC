import { Request, Response } from 'express';
import MatchService from '../services/matches';

export default class TeamController {
  constructor(private matchService = new MatchService()) {}
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };

  public changeProgress = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    // const { inProgress } = req.body;
    console.log(req.body);
    // console.log(inProgress);
    if (authorization) {
      const saveMatch = await this.matchService.changeProgress(req.body);
      return res.status(201).json(saveMatch);
    }
    return res.status(401).json({ message: 'Token must be a valid token' });
  };
}
