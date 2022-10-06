import { Request, Response } from 'express';
import TeamService from '../services/team';
import Leaderboard from '../services/LeaderBoard';

interface Iobj {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
interface Iitem {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export default class LeaderController {
  constructor(
    private leaderBService = new Leaderboard(),
    private teamService = new TeamService(),
  ) {}

  public lintAway = () => {
    const dadosTotais = {
      teamId: 0,
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    return dadosTotais;
  };

  public resultsAway = (item:Iitem, obj: Iobj) => {
    const objCopy = obj;
    objCopy.goalsFavor += item.awayTeamGoals;
    objCopy.goalsOwn += item.homeTeamGoals;
    objCopy.totalGames += 1;
    objCopy.goalsBalance = objCopy.goalsFavor - objCopy.goalsOwn;
    if (Number(item.homeTeamGoals) === Number(item.awayTeamGoals)) {
      objCopy.totalDraws += 1;
      objCopy.totalPoints += 1;
    }
    if (Number(item.homeTeamGoals) > Number(item.awayTeamGoals)) {
      objCopy.totalLosses += 1;
    }
    if (Number(item.homeTeamGoals) < Number(item.awayTeamGoals)) {
      objCopy.totalVictories += 1;
      objCopy.totalPoints += 3;
    }
    const getEfficiency = ((objCopy.totalPoints / (objCopy.totalGames * 3)) * 100).toFixed(2);
    objCopy.efficiency = Number(getEfficiency);
  };

  public resultsHome = (item:Iitem, obj: Iobj) => {
    const objCopy = obj;
    objCopy.goalsFavor += item.homeTeamGoals;
    objCopy.goalsOwn += item.awayTeamGoals;
    objCopy.totalGames += 1;
    objCopy.goalsBalance = objCopy.goalsFavor - objCopy.goalsOwn;
    if (item.homeTeamGoals === item.awayTeamGoals) {
      objCopy.totalDraws += 1;
      objCopy.totalPoints += 1;
    }
    if (item.homeTeamGoals < item.awayTeamGoals) {
      objCopy.totalLosses += 1;
    }
    if (item.homeTeamGoals > item.awayTeamGoals) {
      objCopy.totalVictories += 1;
      objCopy.totalPoints += 3;
    }
    const getEfficiency = ((objCopy.totalPoints / (objCopy.totalGames * 3)) * 100).toFixed(2);
    objCopy.efficiency = Number(getEfficiency);
  };

  public sortedDate = (array: Iobj[]) => {
    const copyArray = array;
    copyArray.sort((a, b) => b.totalPoints - a.totalPoints
    || Number(b.goalsBalance) - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);
    return copyArray;
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.leaderBService.getAll();
    const teams = await this.teamService.getAll();
    const arrayTeams = [];
    for (let index = 1; index < teams.length + 1; index += 1) {
      const obj = this.lintAway();
      console.log(teams[index - 1]?.teamName);
      console.log(teams[index - 1]?.id);
      obj.name = teams[index - 1].teamName;
      obj.teamId = index;
      matches.forEach((item) => {
        if (item.homeTeam === index) {
          this.resultsHome(item, obj);
        }
      });
      arrayTeams.push(obj);
    }
    const callFunc = this.sortedDate(arrayTeams);
    return res.status(200).json(callFunc);
  };
}
