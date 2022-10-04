import { Request, Response, NextFunction } from 'express';
import Match from '../database/models/modelMatch';
import TeamService from '../services/team';

export default class MatchMiddle {
  public model = Match;
  constructor(private teamService = new TeamService()) {}
  public matchvalidation = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res
        .status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const team1 = await this.teamService.findByPk(homeTeam);
    const team2 = await this.teamService.findByPk(awayTeam);
    if (!team1 || !team2) {
      return res
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
