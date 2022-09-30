import { Request, Response } from 'express';
import TeamService from '../services/team';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };

  public findByPk = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const team = await this.teamService.findByPk(id);
    return res.status(200).json(team);
  };
}
