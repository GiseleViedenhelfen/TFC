import { Request, Response } from 'express';
import TeamService from '../services/team';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const team = await this.teamService.getAll();
    return res.status(200).json(team);
  };
}
