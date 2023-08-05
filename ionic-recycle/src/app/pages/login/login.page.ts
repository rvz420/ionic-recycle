import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { AppState } from '@capacitor/app';
import {Store} from '@ngrx/store';
import { hide, show } from 'src/store/loading/loading.actions';
import { recoveredPassword } from 'src/store/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  register() {
    this.router.navigate(['register']);
  }
  login() {
    this.router.navigate(['home']);
  }
  /*forgotEmailPassword() {
    this.store.dispatch(show());

    setTimeout(() =>{
      this.store.dispatch(hide());

    }, 1500);*/

    forgotEmailPassword() {
      this.store.dispatch(recoveredPassword());
  }


  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

}
