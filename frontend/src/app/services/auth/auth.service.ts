// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
// auth.service.ts


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';  // Import throwError for error handling

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'authToken';  // Key for storing JWT in localStorage
  loginError: string = '';
  role: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Call the login API
  login(loginData: Object) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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

          // Navigate to home on successful login
          alert("Login Successful!");
          const token = localStorage.getItem('authToken');
          const headers = { 'Authorization': `Bearer ${token}` };
          this.http.get('http://localhost:8080/user/profile', { headers }).subscribe(
            (data: any) => {
              this.role = data.roles;
              localStorage.setItem('Role', this.role);

              if (localStorage.getItem('Role') === 'USER')
                this.router.navigate(['']);
              else
                this.router.navigate(['/admin-portal']);
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        },
        error: (error: HttpErrorResponse) => {
          // Display error message
          this.loginError = 'Login failed. Please check your credentials and try again.';
          alert(this.loginError)
          console.error('Login failed:', error);
        }
      });
  }

  // Method to log out the user
  logout() {
    localStorage.removeItem(this.token); // Remove token
    this.router.navigate(['/']); // Redirect to homepage
  }

  getToken() {
    localStorage.getItem(this.token);
  }

  removeToken() {
    localStorage.removeItem(this.token);
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem(this.token);
      return !!token; // Return true if token exists, otherwise false
    }
    return false; // If localStorage is not available, return false
  }

  clearSession() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('authToken');
    }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
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
