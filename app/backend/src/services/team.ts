import Team from '../database/models/modelTeams';

export default class TeamService {
  public model = Team;

  public async getAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findByPk(id:string): Promise<Team | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
