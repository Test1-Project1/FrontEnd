import { selectAuthMessageError } from './../../state/auth/auth.selectors';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loginAuths } from './../../state/auth/auth.actions';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  icon_eye: string = 'bi bi-eye-slash';
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({
    password: new FormControl(),
  });
  getState?: Observable<any>;
  errorMessage?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<any>,
    private router: Router
  ) {}
  @Input() my_modal_content?: any;
  ngOnInit(): void {
    this.getState = this.store.select(selectAuthMessageError);
    this.getState?.subscribe((error) => {
      this.errorMessage = error;
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Login() {
    let auth: Auth = {
      userName: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.store.dispatch(loginAuths({ data: auth }));
  }
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
