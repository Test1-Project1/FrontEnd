import { Action, createReducer, on } from '@ngrx/store';
import {
	loginAuths,
	loginAuthsFailure,
	loginAuthsSuccess,
} from './auth.actions';

import { Auth } from '../../models/auth.model';

export const authFeatureKey = 'auth';

export interface AuthState {
	Auth: Auth;
	access_code: string;
	error: string;
}

export const initialState: AuthState = {
	Auth: new Auth(),
	access_code: '',
	error: '',
};

export const AuthReducer = createReducer(
	initialState,
	on(loginAuths, (state: AuthState, { data }) => {
		return {
			...state,
			Auth: data,
		};
	}),
	on(loginAuthsSuccess, (state: AuthState, { data }) => {
		return {
			...state,
			access_code: data,
			error: '',
		};
	}),
	on(loginAuthsFailure, (state: AuthState, { error }) => {
		return {
			...state,
			error,
		};
	}),
);
