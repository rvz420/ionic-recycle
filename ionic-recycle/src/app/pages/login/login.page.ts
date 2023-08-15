import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { login,  recoveredPassword} from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>, private toastController: ToastController) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }
  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.store.select('login').subscribe(loginState => {

      this.onIsRecoveredPassword(loginState);
      this.onError(loginState);

      this.onIsLoggedIn(loginState);

      this.toogleLoading(loginState);
    });
  }


  private toogleLoading(loginState: LoginState) {
    if (loginState.isRecoveringPassword || loginState.isLoggingIn) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }

  }

  private async onIsRecoveredPassword(loginState: LoginState) {

    if (loginState.isRecoveredPassword) {
      const toater = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"

      });
      toater.present();
    }
  }

  private async onError(loginState: LoginState) {

    if (loginState.error) {
      const toater = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toater.present();
    }
  }

  register() {
    this.router.navigate(['register']);
  }
  login() {
    this.store.dispatch(login());
  }

  forgotEmailPassword() {
    this.store.dispatch(recoveredPassword());
  }


  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }


}
