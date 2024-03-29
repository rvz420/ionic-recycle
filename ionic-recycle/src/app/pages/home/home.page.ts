import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  goToPickupCalls() {
    this.router.navigate(['pickup-calls']);
  }
  newPickupCall() {
    this.router.navigate(['pickup-call']);
  }


  constructor(private router: Router) { }

  ngOnInit() {

  }

}
