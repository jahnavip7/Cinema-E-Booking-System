import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../services/promotions/promotions.service';
import { Promotion } from '@shared/models/Promotion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-promotions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-promotions.component.html',
  styleUrl: './manage-promotions.component.scss'
})
export class ManagePromotionsComponent implements OnInit {
  promos: Promotion[] = [];
  title: string = '';
  description: string = '';
  discountPercentage: number = 0;
  startDate?: Date;
  endDate?: Date;

  

  constructor(private promoService: PromotionsService) { }

  ngOnInit(): void {
    console.log(this.startDate);
    console.log(this.endDate);
    this.fetchPromos();
  }

  fetchPromos(): void {
    this.promoService.getPromotions().subscribe({
      next: (data) => {
        this.promos = data;
      },
      error: (error) => {
        console.error('Error fetching promos:', error);
      }
    });
  }

  addPromo() {

  // Check if any required field is not filled
  if (this.title === '' || this.description === '' ) {
    alert('Please fill all fields');
    return;
  }

  // Check if startDate or endDate are not set
  if (!this.startDate || !this.endDate) {
    alert('Please set both start and end dates');
    return;
  }

  // Check if endDate is earlier than startDate
  if (this.endDate < this.startDate) {
    alert('Please select valid date ranges');
    return;
  }

  // Check if discountPercentage is not a valid number
  if (isNaN(this.discountPercentage) || this.discountPercentage <= 0 || this.discountPercentage > 100) {
    alert('Please choose a valid percentage number');
    return;
  }

    const promo = {
      title: this.title,
      description: this.description,
      discountPercentage: this.discountPercentage,
      startDate: this.startDate,
      endDate: this.endDate,
      sent: false
    };
    console.log(promo);
    // this.promoService.addPromotion(promo).subscribe({
    //   next: () => {
    //     alert('Promo added!');
    //     // Optionally refresh the list or indicate success to the user
    //     this.resetForm();
    //     this.fetchPromos(); // Refresh the promotions list
    //   },
    //   error: (error) => {
    //     alert('Error: ' + error.error)
    //   }
    // });
  }


private resetForm() {
  this.title = '';
  this.description = '';
  this.discountPercentage = 0;
  this.startDate = new Date(0); // Reset to the placeholder value
  this.endDate = new Date(0); // Reset to the placeholder value
}

  // sendPromo(id: number): void {
  //   this.promoService.sendPromo(id).subscribe({
  //     next: () => {
  //       console.log('Promo sent successfully!');
  //       // Optionally refresh the list or indicate success to the user
  //     },
  //     error: (error) => {
  //       console.error('Error sending promo:', error);
  //     }
  //   });
  // }
}
