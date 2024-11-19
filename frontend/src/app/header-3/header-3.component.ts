import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header-3',
  standalone: true,
  imports: [],
  templateUrl: './header-3.component.html',
  styleUrl: './header-3.component.scss'
})
export class Header3Component {

  constructor(private router: Router, public authService: AuthService) {

  }

  logout() {
    this.authService.logout();
    alert("You have been logged out of the system.");
    this.router.navigate(['']);
  }
}
