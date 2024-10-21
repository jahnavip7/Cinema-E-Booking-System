import { Component } from '@angular/core';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [PaymentInformationComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  constructor(private router: Router) {

  }

  goToChange() {
    // Add registration logic here if needed
    // Navigate to the verification page after registration
    this.router.navigate(['/change']);
  }
}
