import { addUser } from 'src/app/state/user/user.actions';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/helpers/costum.validator';
import { ConfirmedValidator } from 'src/app/helpers/confirmed.validators';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  userCreationForm: FormGroup = new FormGroup({
    email: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    password: new FormControl(),
  });

  user: User = new User();
  userCreated: User = new User();
  getState?: Observable<any>;
  errorMessage?: string;
  is_valid_form?: boolean = true;
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;
  icon_eye: string = 'bi bi-eye-slash';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('init');
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    // return false;
    // };

    console.log(this.errorMessage);
    this.userCreationForm = this.formBuilder.group(
      {
        email: [localStorage.getItem('username'), Validators.email],
        username: ['', Validators.required],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(5),
          ]),
        ],
        confirm_password: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirm_password'),
      }
    );
  }
  createuser() {
    this.prepareuser();
    console.log(this.user);
    this.store.dispatch(addUser({ user: this.user }));
  }
  prepareuser() {
    this.user.email = this.userCreationForm.get('email')?.value;
    this.user.password = this.userCreationForm.get('password')?.value;
    this.user.userName = this.userCreationForm.get('username')?.value;
    console.log('prepareUer ' + this.user);
  }

  enableBTmSubmit() {
    if (
      this.userCreationForm.get('email')?.errors?.required ||
      this.userCreationForm.get('email')?.errors?.email ||
      this.userCreationForm.controls['password'].hasError('required') ||
      this.userCreationForm.get('username')?.errors?.required ||
      this.userCreationForm.get('username')?.errors?.username ||
      this.userCreationForm.controls['password'].hasError('minlength') ||
      this.userCreationForm.get('password')?.errors?.required ||
      this.userCreationForm.controls['password'].hasError('required') ||
      this.userCreationForm.controls['password'].hasError('minlength') ||
      this.userCreationForm.controls['password'].hasError('hasNumber') ||
      this.userCreationForm.controls['password'].hasError('hasCapitalCase') ||
      this.userCreationForm.controls['password'].hasError(
        'hasSpecialCharacters'
      ) ||
      this.userCreationForm.get('confirm_password')?.errors
        ?.confirmedValidator ||
      this.userCreationForm.get('confirm_password')?.errors?.required
    ) {
      console.log('form has error ');
      this.is_valid_form = true;
    } else {
      console.log('form has not errors ');
      this.is_valid_form = false;
    }
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
  showHidePasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
}
