import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  token: string = '';
  password='';
  confirmPassword='';

  constructor( private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.removeToken();
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || ''; // Set the token
      console.log('Token:', this.token); // Log to verify it's being retrieved
    });
  }

  onSubmit() {

    if (this.password.length < 6 || this.confirmPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (!this.password || !this.confirmPassword) {
      alert('Password fields cannot be empty.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const payload = {
      password: this.password
    };

    const apiUrl = `http://localhost:8080/user/resetPassword?token=${this.token}`;

    this.http.post(apiUrl, payload, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      (response: any) => {
        console.log('Success:', response);
        alert(response.message); // This can be the success message
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
