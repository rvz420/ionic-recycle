import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent  implements OnInit {

  @Input() message:String | undefined;

  @Input()
  field!: FormGroup | null;


  @Input() error: string = '';

  constructor() { }

  ngOnInit() {}

  shouldShowComponent(){

    if (this.field?.touched && this.field?.errors?.[this.error]){
      return true;
    }else{
      return false;
    }
  }

}
