import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.models';

export enum UserActionTypes {
  ADD = '[User] ADD User',
  ADD_SUCCESS = '[User] ADD User Success',
  ADD_FAILED = '[User] ADD User FAILED',
  FIND_BY_EMAIL = '[User] FIND User by email',
  FIND_BY_EMAIL_SUCCESS = '[User] FIND User by email  Success',
  FIND_BY_EMAIL_FAILD = '[User] FIND User  by email FAILED',
}

export const addUser = createAction(
  UserActionTypes.ADD,
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  UserActionTypes.ADD_SUCCESS,
  props<{ user: User }>()
);

export const addUserFailed = createAction(
  UserActionTypes.ADD_FAILED,
  props<{ payload: any }>()
);
export const findUserByEmail = createAction(
  UserActionTypes.FIND_BY_EMAIL,
  props<{ user: User }>()
);

export const findUserByEmailSuccess = createAction(
  UserActionTypes.FIND_BY_EMAIL_SUCCESS,
  props<{ user: User }>()
);

export const findUserByEmailFailed = createAction(
  UserActionTypes.FIND_BY_EMAIL_FAILD,
  props<{ error: any }>()
);
