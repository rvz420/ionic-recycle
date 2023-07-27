import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {

  let loginPageForm: LoginPageForm;
  let form: FormGroup;

  beforeEach(() => {
    loginPageForm = new LoginPageForm(new FormBuilder());
    form = loginPageForm.createForm();
  });

  it('Should create login form empty', () => {
    expect(loginPageForm).not.toBeNull();
    expect(form).not.toBeNull();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')?.value).toEqual("");
    expect(form.get('email')?.valid).toBeFalse();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')?.value).toEqual("");
    expect(form.get('password')?.valid).toBeFalse();
  });

  it('should have email invalid if email is not valid', () => {
    form.get('email')?.setValue('invalid email');

    expect(form.get('email')?.valid).toBeFalse();

  });

  it('should have email valid if email is valid', () => {
    form.get('email')?.setValue('somevalid@email.com');

    expect(form.get('email')?.valid).toBeTrue();

  });

  it('should have valid form', () => {
    form.get('email')?.setValue('somevalid@email.com');
    form.get('password')?.setValue('aNyPassword');

    expect(form.valid).toBeTrue();

  });

});
