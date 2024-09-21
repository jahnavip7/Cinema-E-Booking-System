import { Component } from '@angular/core';
import { PaymentInformationComponent } from '../payment-information/payment-information.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [PaymentInformationComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

}
