import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header-2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header-2.component.html',
  styleUrl: './header-2.component.scss'
})
export class Header2Component {

  constructor(private router: Router, public authService: AuthService) {

  }

  logout() {
    this.authService.logout();
    alert("You have been logged out of the system.");
    this.router.navigate(['']);
  }

}
