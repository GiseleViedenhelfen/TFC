import { Request, Response } from 'express';
import MatchService from '../services/matches';

export default class TeamController {
  constructor(private matchService = new MatchService()) {}
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  };
}
