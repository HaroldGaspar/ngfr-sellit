import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONST_LOGIN_PAGE } from 'src/app/data/constants';
import { Product } from 'src/app/interface/product';
import { ShopingCartServiceService, AuthService } from '@services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // credentials: Credentials;
  data = CONST_LOGIN_PAGE;
  loginForm;
  rloginForm;
  credentials: CredentialsDAO = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private shopingCartService: ShopingCartServiceService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.data.FORM;
    this.rloginForm = this.fb.group({
      email: [
        '',
        [
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
          Validators.required,
        ],
      ],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    this.authService.login(this.credentials).subscribe(({ token }) => {
      this.router.navigate(['/home']);
    });
  }

  rlogin() {
    this.authService
      .login({
        email: this.fm['email'].value,
        password: this.fm['password'].value,
      })
      .subscribe(({ token }) => {
        this.router.navigate(['/home']);
      });
  }

  isValidForm() {
    return this.loginForm.email.isValid() && this.loginForm.password.isValid();
  }

  get fm() {
    return this.rloginForm.controls;
  }
}

export interface CredentialsDAO {
  username?: string;
  email: string;
  password: string;
  password_dup?: string;
}
