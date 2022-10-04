import Team from '../database/models/modelTeams';
import Match from '../database/models/modelMatch';

interface date {

  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class MatchService {
  public model = Match;

  public async getAll(): Promise<Match[]> {
    const teams = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return teams;
  }

  public async changeProgress(matches: date): Promise<Match[] | unknown> {
    const match = await this.model.create({ ...matches, inProgress: true });
    return match as Match;
  }

  public async finishMatch(id: number): Promise<Match> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });
    return match as unknown as Match;
  }
}
