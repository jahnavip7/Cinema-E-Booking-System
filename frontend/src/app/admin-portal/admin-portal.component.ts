import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [],
  templateUrl: './admin-portal.component.html',
  styleUrl: './admin-portal.component.scss'
})
export class AdminPortalComponent {

  constructor(private router: Router) {}

  manageMovies() {
    this.router.navigate(['/manage-movies']);
  }

  manageUsers() {
    // this.router.navigate(['/manage-movies']);
  }

  managePromos() {
    this.router.navigate(['/manage-promos']);
  }
}
