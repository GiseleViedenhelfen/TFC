import * as express from 'express';
import User from './controllers/userController';
import Team from './controllers/teamController';
import Match from './controllers/matchController';
import LoginMiddle from './middlewares/login';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    const UserController = new User();
    const TeamController = new Team();
    const matchController = new Match();
    const middleLogin = new LoginMiddle();
    this.config();

    // Não remover essa rota
    // gets
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/login/validate', UserController.role);
    this.app.get('/teams', TeamController.getAll);
    this.app.get('/teams/:id', TeamController.findByPk);
    this.app.get('/matches', matchController.getAll);
    // posts
    this.app.post('/login', middleLogin.LoginValidation, UserController.Login);
    this.app.post('/matches', matchController.changeProgress);
    this.app.patch('/matches/:id/finish', matchController.finishMatch);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
