import { on, createReducer } from '@ngrx/store';

import { User } from 'src/app/models/user.models';
import {
  addUser,
  addUserFailed,
  addUserSuccess,
  findUserByEmail,
  findUserByEmailFailed,
  findUserByEmailSuccess,
} from './user.actions';
export interface UserState {
  is_loading: boolean;
  user: User;
  errorMessage: string;
}

export const initialState: UserState = {
  is_loading: false,
  errorMessage: '',
  user: new User(),
};

export const UserReducer = createReducer(
  initialState,
  on(addUser, (state: UserState, action) => {
    return {
      ...state,
    };
  }),
  on(addUserSuccess, (state: UserState, { user }) => {
    console.log('add suecc' + user);
    return {
      ...state,
      user,
    };
  }),
  on(addUserFailed, (state: UserState, { payload }) => {
    return {
      ...state,
      errorMessage: payload,
    };
  }),

  on(findUserByEmail, (state: UserState) => {
    return {
      ...state,
      is_loading: true,
    };
  }),
  on(findUserByEmailSuccess, (state: UserState, { user }) => {
    return {
      ...state,
      user,
      is_loading: false,
    };
  }),
  on(findUserByEmailFailed, (state: UserState, { error }) => {
    return {
      ...state,
      is_loading: false,
      errorMessage: error,
    };
  })
);
