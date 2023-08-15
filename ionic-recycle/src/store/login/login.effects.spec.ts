import { Observable, of, throwError } from "rxjs";
import { LoginEffects } from "./login.effects"
import { Action, StoreModule } from "@ngrx/store";
import { TestBed } from "@angular/core/testing";
import { login, loginFail, loginSuccess, recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from "./login.actions";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/User";
describe('Login effects', () => {

  let effects: LoginEffects;
  let actions$: Observable<Action>;
  let error = new Error('Error');
  let user = new User();
  user.id = "any";
  let authServiceMock = {
    recoverEmailPassword: (email: string) => {
      if(email === "error@email.com"){
        return throwError(() => error );
      }
      return of({});
    },
    login: (email: string, password: string) => {
      if(email === "error@email.com"){
        return throwError(() => error );
      }
      return of(user);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([
          LoginEffects
        ])

      ], providers : [
        provideMockActions(() => actions$)
      ]
    }).overrideProvider(AuthService, {useValue: authServiceMock});

    effects = TestBed.inject(LoginEffects);
  })

  it('should recover password with existing email return success', (done) => {
    actions$ = of(recoveredPassword({email: "any@mail.com"}));

    effects.recoveredPassword$.subscribe(newAction => {
      expect(newAction).toEqual(recoveredPasswordSuccess());
      done();
    })
  })

  it('should recover password with existing email return fail', (done) => {
    actions$ = of(recoveredPassword({email: "error@email.com"}));

    effects.recoveredPassword$.subscribe(newAction => {
      expect(newAction).toEqual(recoveredPasswordFail({error}));
      done();
    })
  })
  it('should login with valid credentials return success', (done) => {
    actions$ = of(login({email: "any@email.com", password: "1234"}));

    effects.login$.subscribe(newAction => {
      expect(newAction).toEqual(loginSuccess({user}));
      done();
    })
  })

  it('should login with invalid credentials return fail', (done) => {
    actions$ = of(login({email: "error@email.com", password: "1234"}));

    effects.login$.subscribe(newAction => {
      expect(newAction).toEqual(loginFail({error}));
      done();
    })
  })

})
