import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';
  isClicked: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    // Placeholder for API call
    const payload = {
      emailId: this.email
    };
    this.http.post('http://localhost:8080/user/forgotPassword', payload).subscribe(
      (response: any) => {
        console.log('Success:', response);
        alert(response.message); // This can be the success message
      },
      (error: any) => {
        console.error('Error:', error);
        alert('Update failed: ' + error.error.message || 'Please try again.');
      }
    );
  }
}
