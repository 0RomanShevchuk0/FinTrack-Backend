import { Request } from 'express';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

export interface RequestWithUser extends Request {
  user: AuthUser;
}
