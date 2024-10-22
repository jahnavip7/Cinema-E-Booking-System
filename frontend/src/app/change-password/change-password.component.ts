import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  private apiUrl = 'http://localhost:8080/user';

  constructor( private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService) {}

  onSubmit() {

    if (this.currentPassword.length < 6 || this.confirmPassword.length < 6 || this.newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (!this.newPassword || !this.confirmPassword || !this.currentPassword) {
      alert('Password fields cannot be empty.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const changePasswordRequest = { 
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log(token);

    // return this.http.post(`${this.apiUrl}/changePassword`, changePasswordRequest, { headers });

    this.http.post(`${this.apiUrl}/changePassword`, changePasswordRequest, { headers }).subscribe(
      (response: any) => {
        console.log('Success:', response);
        alert(response.message); // This can be the success message
      },
      (error: any) => {
        console.error('Error:', error);
        alert(error.error.error);
      }
    );
  }

}
