import { AuthState } from './auth/auth.reducer';
import { UserState } from './user/user.reducers';

export interface AppState {
  user: UserState;
  auth: AuthState;
}
