import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/User/User.service';
import {
  addUserFailed,
  addUserSuccess,
  findUserByEmailFailed,
  findUserByEmailSuccess,
  UserActionTypes,
} from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private UserService: UserService,
    private router: Router
  ) {}

  AddUserEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UserActionTypes.ADD),
      switchMap((action: any) => {
        return this.UserService.save(action.user).pipe(
          map((user) => addUserSuccess({ user })),
          catchError((err) => of(addUserFailed(err.message)))
        );
      })
    )
  );

  AddUserSuccessEffect$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(UserActionTypes.ADD_SUCCESS),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  FindUserByEmailEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UserActionTypes.FIND_BY_EMAIL),
      switchMap((action: any) => {
        return this.UserService.findbyEmail(action.User).pipe(
          map(
            (user) => findUserByEmailSuccess({ user })
            //this.router.navigate(['/login'])
          ),
          catchError((error) => of(findUserByEmailFailed({ error })))
        );
      })
    )
  );
}
