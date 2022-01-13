import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLoging;
  isSeller;
  constructor(private router: Router, private authService: AuthService) {
    // this.isLoging = ;
    this.isLoging = authService.isLoging$;
    this.isSeller = authService.isSeller$;

    //persist through the page refresh
    const store = localStorage.getItem('store');
    const token = localStorage.getItem('token');
    localStorage.getItem('token')
      ? authService.stateLogin(store ? parseInt(store) : null, token!)
      : authService.stateLogout();
  }

  ngOnInit(): void {}

  closeSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('store');
    this.router.navigate(['/home']);
    this.authService.stateLogout();
  }
}
