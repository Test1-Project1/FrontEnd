import { Auth } from './../../models/auth.model';
import { createAction, props } from '@ngrx/store';


export const loginAuths = createAction(
	'[Auth] Login',
	props<{ data: Auth }>(),
);

export const loginAuthsSuccess = createAction(
	'[Auth] Auth Success',
	props<{ data: any }>(),
);

export const loginAuthsFailure = createAction(
	'[Auth] Auth Failure',
	props<{ error: string }>(),
);
