import User from '../database/models/modelUser';

class UserService {
  public model = User;
  public async Login(email: string, _password: string): Promise<User> {
    const login = await this.model.findOne({ where: { email } }) as unknown as User;
    return login;
  }
}

export default UserService;
