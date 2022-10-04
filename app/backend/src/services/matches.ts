import Team from '../database/models/modelTeams';
import Match from '../database/models/modelMatch';

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

  // public async findByPk(id:string): Promise<Team | null> {
  //   const team = await this.model.findByPk(id);
  //   return team;
  // }
}
