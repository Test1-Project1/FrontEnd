import { createSelector } from '@ngrx/store';
import { AppState } from './../app.states';
import { UserState } from './user.reducers';

export const selectAccounts = (state: AppState) => state.user;

export const selectAccount = createSelector(
  selectAccounts,
  (state: UserState) => state.user
);

export const selectAccountError = createSelector(
  selectAccounts,
  (state: UserState) => state.errorMessage
);

export const selectAccountLoading = createSelector(
  selectAccounts,
  (state: UserState) => state.is_loading
);
