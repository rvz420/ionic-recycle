import { Observable, of, throwError } from "rxjs";
import { LoginEffects } from "./login.effects"
import { Action, StoreModule } from "@ngrx/store";
import { TestBed } from "@angular/core/testing";
import { recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from "./login.actions";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { AuthService } from "src/app/services/auth/auth.service";
describe('Login effects', () => {

  let effects: LoginEffects;
  let actions$: Observable<Action>;
  let error = new Error('Error');
  let authServiceMock = {
    recoverEmailPassword: (email: string) => {
      if(email == "error@email.com"){
        return throwError(() => error );
      }
      return of({});
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

  it('should recover password with existing email return', (done) => {
    actions$ = of(recoveredPassword());

    effects.recoveredPassword$.subscribe(newAction => {
      expect(newAction).toEqual(recoveredPasswordSuccess());
      done();
    })
  })

})
