import { Injectable } from "@angular/core";
import { recoveredPassword, recoveredPasswordSuccess } from "./login.actions";
import { Actions, createEffect, ofType  } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";


@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private authService : AuthService){

  }

    recoveredPassword$ = createEffect(() => this.actions$.pipe(
      ofType(recoveredPassword),
      switchMap(()=> this.authService.recoverEmailPassword("valid@email.com").pipe(
        map(() => recoveredPasswordSuccess())
      ) )
    ))

  }

