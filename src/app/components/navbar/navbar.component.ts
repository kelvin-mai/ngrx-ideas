import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store';
import { SetCurrentUser } from '@app/store/actions/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: ['/'],
      icon: 'fa fa-home'
    },
    {
      label: 'Ideas',
      routerLink: ['/ideas']
    },
    {
      label: 'Users',
      routerLink: ['/users']
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  onClick() {
    if (this.authService.token) {
      this.authService.token = null;
      this.store.dispatch(new SetCurrentUser(null));
    }
    this.router.navigate(['/auth']);
  }
}
