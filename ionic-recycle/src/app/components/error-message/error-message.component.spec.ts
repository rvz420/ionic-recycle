import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should show error message on field touched and error present', () => {

    component.field = new FormGroup({anyField: new FormControl()});
    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = "anyError";
    expect(component.shouldShowComponent()).toBeTruthy();
  });

  it('should hide error message on field not touched', () => {

    component.field = new FormGroup({email: new FormControl()});
    component.field.setErrors({email: true});
    component.error = "anyError";
    expect(component.shouldShowComponent()).toBeFalse();
  });

  it('should hide error message on field touched but without error', () => {

    component.field = new FormGroup({email: new FormControl()});
    component.error = "anyError";
    expect(component.shouldShowComponent()).toBeFalse();
  });

  it('should hide error message on field touched but with diferent error present', () => {
    component.field = new FormGroup({anyField: new FormControl()});
    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = "anotherError";
    expect(component.shouldShowComponent()).toBeFalse();
  });

});
