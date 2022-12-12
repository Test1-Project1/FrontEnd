import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
	loginAuths,
	loginAuthsFailure,
	loginAuthsSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
	constructor(
		private actions: Actions,
		private authService: AuthService,
		private router: Router,
	) {}

	Authentify = createEffect(() =>
		this.actions.pipe(
			ofType(loginAuths.type),
			switchMap((action: any) => {
				return this.authService.authentify(action.data).pipe(
					map((access_token) =>
						loginAuthsSuccess({ data: access_token }),
					),
					tap(() => this.router.navigate(['/home'])),
					catchError(({ error }) =>
						of(loginAuthsFailure({ error: error.message })),
					),
				);
			}),
		),
	);
}
