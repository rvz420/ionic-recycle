import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  register() {
    this.router.navigate(['register']);
  }
  login() {
    this.router.navigate(['home']);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
