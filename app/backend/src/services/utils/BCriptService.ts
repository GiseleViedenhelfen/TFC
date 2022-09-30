import * as bcrypt from 'bcryptjs';

export default class BcryptService {
  public static compare(encryptText: string, planText: string): boolean {
    return bcrypt.compareSync(planText, encryptText);
  }
}
