import Team from '../database/models/modelTeams';

export default class TeamService {
  public model = Team;

  public async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
