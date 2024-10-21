import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';  // Import throwError for error handling

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule],  // Add FormsModule to imports array
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';  // Variable to store error messages
  private token = 'authToken';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {}

  onSubmit() {
    // Construct the login data
    const loginData = {
      emailId: this.email,
      password: this.password
    };

    // Set HTTP headers
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Call the login API
    this.http.post('http://localhost:8080/user/login', loginData, { headers })
      .pipe(
        catchError(this.handleError)  // Handle errors gracefully
      )
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);

          // Store the JWT token (assuming the response contains the token)
          if (response.token) {
            localStorage.setItem(this.token, response.token);  // Save token to localStorage
          }

          // Navigate to the dashboard on successful login
          this.router.navigate(['/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          // Display error message
          this.loginError = 'Login failed. Please check your credentials and try again.';
          console.error('Login failed:', error);
        }
      });
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem(this.token); // Remove token
    this.router.navigate(['/']); // Redirect to homepage
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.token);  // Check if JWT exists
  }

  // Error handling function
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
