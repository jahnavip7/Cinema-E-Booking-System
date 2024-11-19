
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule, Router } from '@angular/router'; // Add Router for navigation

// @Component({
//   selector: 'app-select-seat',
//   templateUrl: './select-seat.component.html',
//   styleUrls: ['./select-seat.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule] // Ensure necessary imports are added
// })
// export class SelectSeatComponent {
//   userName = 'User'; // Username placeholder

//   // Configuring 5 seats per row for 8 rows
//   rows = [
//     ['A1', 'A2', 'A3', 'A4', 'A5'],
//     ['B1', 'B2', 'B3', 'B4', 'B5'],
//     ['C1', 'C2', 'C3', 'C4', 'C5'],
//     ['D1', 'D2', 'D3', 'D4', 'D5'],
//     ['E1', 'E2', 'E3', 'E4', 'E5'],
//     ['F1', 'F2', 'F3', 'F4', 'F5'],
//     ['G1', 'G2', 'G3', 'G4', 'G5'],
//     ['H1', 'H2', 'H3', 'H4', 'H5'],
//   ];

//   seatType: { [key: string]: string } = {}; // Holds seat types like Adult, Child, Senior
//   seatStatus: { [key: string]: string } = {}; // Tracks seat status (available, selected, booked)
//   selectedSeats: { seat: string, type: string }[] = []; // Track selected seats and types

//   constructor(private router: Router) {
//     // Initialize seat statuses - all are available initially
//     this.rows.forEach(row => {
//       row.forEach(seat => {
//         this.seatStatus[seat] = 'available'; // Mark all seats as available initially
//       });
//     });

//     // Mark some seats as booked for demonstration purposes
//     this.seatStatus['A5'] = 'booked';
//     this.seatStatus['G2'] = 'booked';
//   }

//   // Getter to map and return selected seat numbers as a string
//   get selectedSeatNumbers(): string {
//     return this.selectedSeats.map(s => `${s.seat} (${s.type})`).join(', ') || 'None';
//   }

//   // Function to select or deselect seats and assign a type (Adult, Child, Senior)
//   selectSeat(seat: string) {
//     if (this.seatStatus[seat] === 'booked') {
//       alert('This seat is already booked!');
//       return;
//     }

//     const existingIndex = this.selectedSeats.findIndex(s => s.seat === seat);
//     if (existingIndex !== -1) {
//       // Deselect seat if already selected
//       this.selectedSeats.splice(existingIndex, 1);
//       this.seatStatus[seat] = 'available';
//     } else {
//       // Select seat and mark as selected, assign the type of seat (default to Adult if not selected)
//       const seatType = this.seatType[seat] || 'Adult'; 
//       this.selectedSeats.push({ seat, type: seatType });
//       this.seatStatus[seat] = 'selected';
//     }
//   }

//   // Function to handle order summary navigation
//   proceedToOrderSummary() {
//     if (this.selectedSeats.length === 0) {
//       alert('Please select at least one seat to proceed.');
//       return;
//     }

//     console.log('Proceeding to order summary with seats: ', this.selectedSeats);
//     // Navigate to the order-summary page with seat data
//     this.router.navigate(['/order-summary'], { 
//       state: { 
//         selectedSeats: this.selectedSeats,
//         movieTitle: 'Barbie', // Replace this with the actual movie title dynamically
//         showTime: new Date(2023, 11, 1) // Example showtime, replace dynamically
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class SelectSeatComponent {
  userName = 'User';

  rows = [
    ['A1', 'A2', 'A3', 'A4', 'A5'],
    ['B1', 'B2', 'B3', 'B4', 'B5'],
    ['C1', 'C2', 'C3', 'C4', 'C5'],
    ['D1', 'D2', 'D3', 'D4', 'D5'],
    ['E1', 'E2', 'E3', 'E4', 'E5'],
    ['F1', 'F2', 'F3', 'F4', 'F5'],
    ['G1', 'G2', 'G3', 'G4', 'G5'],
    ['H1', 'H2', 'H3', 'H4', 'H5'],
  ];

  seatType: { [key: string]: string } = {};
  seatStatus: { [key: string]: string } = {};
  selectedSeats: { seat: string, type: string }[] = [];

  constructor(private router: Router) {
    this.rows.forEach(row => {
      row.forEach(seat => {
        this.seatStatus[seat] = 'available';
        this.seatType[seat] = '';
      });
    });

    this.seatStatus['A5'] = 'booked';
    this.seatStatus['G2'] = 'booked';
  }

  get selectedSeatNumbers(): string {
    return this.selectedSeats.map(s => `${s.seat} (${s.type})`).join(', ') || 'None';
  }

  selectSeat(seat: string, type: string) {
    if (this.seatStatus[seat] === 'booked') {
      alert('This seat is already booked!');
      return;
    }
    
    if (type === '') {
      // Handle deselection only if type is the blank option
      const existingIndex = this.selectedSeats.findIndex(s => s.seat === seat);
      if (existingIndex !== -1) {
        this.selectedSeats.splice(existingIndex, 1);
        this.seatStatus[seat] = 'available';
      }
      this.seatType[seat] = ''; // Reset to blank when deselected
    } else {
      // Update or add the seat with the new type
      const existingIndex = this.selectedSeats.findIndex(s => s.seat === seat);
      if (existingIndex !== -1) {
        // Update the existing seat type
        this.selectedSeats[existingIndex].type = type;
      } else {
        // Add new seat if not already selected
        this.selectedSeats.push({ seat, type });
        this.seatStatus[seat] = 'selected';
      }
      this.seatType[seat] = type; // Ensure the type is updated
    }
  }
  

  proceedToOrderSummary() {
    if (this.selectedSeats.length === 0 || this.selectedSeats.some(s => s.type === '')) {
      alert('Please select at least one seat and specify the type to proceed.');
      return;
    }

    console.log('Proceeding to order summary with seats: ', this.selectedSeats);
    this.router.navigate(['/order-summary'], {
      state: {
        selectedSeats: this.selectedSeats,
        movieTitle: 'Barbie',
        showTime: new Date(2023, 11, 1)
      }
    });
  }
}
