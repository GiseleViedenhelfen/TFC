import Match from '../database/models/modelMatch';

export default class Leaderboard {
  public model = Match;

  public getAll = async (): Promise<Match[]> => {
    const Matches = await Match.findAll({ where: { inProgress: false } });
    return Matches as unknown as Match[];
  };
}
