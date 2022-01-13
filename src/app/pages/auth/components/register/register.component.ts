import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  ApiResponse,
  ShopingCartServiceService,
} from 'src/app/services/shoping-cart-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    password: '',
    password_dup: '',
    store: '',
  };
  @ViewChild('storeInput') storeInput: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private shopingCartService: ShopingCartServiceService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.user.password == this.user.password_dup)
      this.authService
        .register(this.user)
        // .pipe(tap((res) => console.log(res)))
        .subscribe((res: ApiResponse) => {
          console.log(res);
          if (res.error === true) alert(res.msg);
          else this.router.navigate(['/home']);
        });
    else alert('Las contrasenas no coinciden');
  }

  showHiddenInput() {
    this.storeInput.nativeElement.hidden =
      !this.storeInput.nativeElement.hidden;
  }
}

export interface User {
  username: string;
  email: string;
  password: string;
  password_dup: string;
  store: string;
}
