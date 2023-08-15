import { Injectable } from "@angular/core";
import { login, loginFail, loginSuccess, recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from "./login.actions";
import { Actions, createEffect, ofType  } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";


@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private authService : AuthService){

  }

    recoveredPassword$ = createEffect(() => this.actions$.pipe(
      ofType(recoveredPassword),
      switchMap((payload: {email: string})=> this.authService.recoverEmailPassword(payload.email).pipe(
        map(() => recoveredPasswordSuccess()),
        catchError(error => of(recoveredPasswordFail({error})))
      ) )
    ))

    login$ = createEffect(() => this.actions$.pipe(
      ofType(login),
      switchMap((payload: {email: string, password: string}) =>
      this.authService.login(payload.email,payload.password).pipe(
        map(user => loginSuccess({user}))
      )), catchError(error => of(loginFail({error})))
    ))

  }

