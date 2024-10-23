import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';  // Import throwError for error handling
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule],  // Add FormsModule to imports array
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  role: string = '';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      this.email = localStorage.getItem('email') as string;
      this.password = localStorage.getItem('password') as string;
      this.rememberMe = !!localStorage.getItem('email');
    }
  }

  onSubmit() {
    // Construct the login data

    if (this.rememberMe) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
    const loginData = {
      emailId: this.email,
      password: this.password
    };
    this.authService.login(loginData);
    // this.setRole();
  }

  setRole() {
    console.log(localStorage.getItem('authToken'));
    const token = localStorage.getItem('authToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    // this.http.get('http://localhost:8080/user/profile', { headers }).subscribe((data: any) => {
    //   this.role = data.roles;
    //   localStorage.setItem('Role', this.role)
    //   console.log(localStorage.getItem('Role'));
    // });
    this.http.get('http://localhost:8080/user/profile', { headers }).subscribe(
      (data: any) => {
        this.role = data.roles;
        localStorage.setItem('Role', this.role);
        console.log(localStorage.getItem('Role'));
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
