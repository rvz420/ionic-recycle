import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';

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

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {
  }

}
