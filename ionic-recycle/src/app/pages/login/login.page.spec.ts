import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { loginReducer } from 'src/store/login/login.reducers';
import { recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from 'src/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/model/user/User';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toastController: ToastController;
  let authService : AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
      StoreModule.forRoot([]),
      StoreModule.forFeature("loading", loadingReducer),
      StoreModule.forFeature("login", loginReducer)]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    page = fixture.debugElement.nativeElement;
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    authService = TestBed.inject(AuthService);
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

  }));

  it('should create', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should go to register page on login register button', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {

    // start page
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    page.querySelector("#recoverPasswordButton").click();
    // expect loginState.isRecoveringPassword is true
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTrue();
    })
  });

  it('should show loading when recovering password', () => {

    fixture.detectChanges();
    store.dispatch(recoveredPassword());
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeTrue();
    })
  });

  it('should hide loading and show message when has recovered password', () => {

    fixture.detectChanges();
    store.dispatch(recoveredPassword());
    store.dispatch(recoveredPasswordSuccess());
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeFalse();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should hide loading and show error message when error on recover password', () => {

    fixture.detectChanges();
    store.dispatch(recoveredPassword());
    store.dispatch(recoveredPasswordFail({error: "error"}));
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeFalse();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should show loading and start login when loggin in', () => {

    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector("#loginButton").click();

    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeTrue();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTrue();
    })
  });


  it('should hide loading and send user to home page when user has logged in', () => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User()));
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector("#loginButton").click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalse();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeFalse();
    })

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should hide loading and show error when user couldnt login', () => {

    spyOn(authService, 'login').and.returnValue(throwError({message: 'Error'}));

    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector("#loginButton").click();
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeFalse();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

});
