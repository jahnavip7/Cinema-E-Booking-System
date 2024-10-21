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

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private authService: AuthService) {}

  onSubmit() {
    // Construct the login data
    const loginData = {
      emailId: this.email,
      password: this.password
    };
    this.authService.login(loginData);
  }

}
