import { createSelector } from '@ngrx/store';
import { AppState } from './../app.states';
import { AuthState } from './auth.reducer';

export const selectAuths = (state: AppState) => state.auth;

export const selectAuth = createSelector(
	selectAuths,
	(state: AuthState) => state.Auth,
);
export const selectAuthMessageError = createSelector(
	selectAuths,
	(state: AuthState) => state.error,
);
