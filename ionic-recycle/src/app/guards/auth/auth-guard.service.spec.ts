import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { loginSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from 'src/app/pages/login/login.page';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginPage}
      ]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer)
      ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow logged user to access page', () => {
    store.dispatch(loginSuccess({ user: new User() }));
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTrue();
    });
  });

  it('should not allow users to access page if user is not logged in', () => {
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalse();
    });
  });

  /* TODO fix this test
  it('should not allow users be sent to login page', () => {
    spyOn(router, 'navigateByUrl')
    guard.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    });
  }); */
});
