import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.scss'],
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

  movie: any;
  movieId: number = 0;
  movieName: string = '';
  show: any;
  showId: number = 0;
  childCount: number = 0;
  adultCount: number = 0;
  seniorCount: number = 0;
  timeString: string = '';
  bookedSeats: any = [];

  seatType: { [key: string]: string } = {};
  seatStatus: { [key: string]: string } = {};
  selectedSeats: { seat: string, type: string }[] = [];

  constructor(private router: Router, private http: HttpClient) {


    // this.rows.forEach(row => {
    //   row.forEach(seat => {
    //     this.seatStatus[seat] = 'available';
    //     this.seatType[seat] = '';
    //   });
    // });

    this.rows.forEach(row => {
      row.forEach(seat => {
        if (this.bookedSeats.includes(seat) && this.bookedSeats.length != 0) {
          this.seatStatus[seat] = 'booked';
        } else {
          this.seatStatus[seat] = 'available';
        }
        this.seatType[seat] = '';
      });
    });

    // Retrieve navigation state passed from previous component
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.movie = navigation.extras.state['movie'];
      this.movieId = navigation.extras.state['movieId'];
      this.movieName = navigation.extras.state['movieName'];
      this.show = navigation.extras.state['show'];
      this.showId = navigation.extras.state['showId'];
      this.timeString = navigation.extras.state['timeString'];
      this.selectedSeats = navigation.extras.state['selectedSeats'];
    }

  }

  ngOnInit() {
    this.initializeSelectedSeats();
    this.http.get<any>(`http://localhost:8080/api/shows/bookedSeats/${this.showId}`).subscribe({
      next: (response) => {
        this.bookedSeats = response.bookedSeats;
        console.log('Booked Seats:', this.bookedSeats);
      },
      error: (error) => {
        alert('Error fetching booked seats: ' + error.message);
      }
    });
  }

  get selectedSeatNumbers(): string {
    return this.selectedSeats.map(s => `${s.seat} (${s.type})`).join(', ') || 'None';
  }

  // selectSeat(seat: string, type: string) {
  //   if (this.seatStatus[seat] === 'booked') {
  //     alert('This seat is already booked!');
  //     return;
  //   }
    
  //   if (type === '') {
  //     // Handle deselection only if type is the blank option
  //     const existingIndex = this.selectedSeats.findIndex(s => s.seat === seat);
  //     if (existingIndex !== -1) {
  //       this.selectedSeats.splice(existingIndex, 1);
  //       this.seatStatus[seat] = 'available';
  //     }
  //     this.seatType[seat] = ''; // Reset to blank when deselected
  //   } else {
  //     // Update or add the seat with the new type
  //     const existingIndex = this.selectedSeats.findIndex(s => s.seat === seat);
  //     if (existingIndex !== -1) {
  //       // Update the existing seat type
  //       this.selectedSeats[existingIndex].type = type;
  //     } else {
  //       // Add new seat if not already selected
  //       this.selectedSeats.push({ seat, type });
  //       this.seatStatus[seat] = 'selected';
  //     }
  //     this.seatType[seat] = type; // Ensure the type is updated
  //   }
  // }
  selectSeat(seat: string, type: string, initializing: boolean = false) {
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
      // Update or add the seat with the new type only if not initializing
      if (!initializing) {
        const existingIndex = this.selectedSeats.findIndex(s => s.seat === seat);
        if (existingIndex !== -1) {
          // Update the existing seat type
          this.selectedSeats[existingIndex].type = type;
        } else {
          // Add new seat if not already selected
          this.selectedSeats.push({ seat, type });
        }
      }
      this.seatStatus[seat] = 'selected';
      this.seatType[seat] = type; // Ensure the type is updated
    }
  }
  initializeSelectedSeats() {
    // Check if selectedSeats array is not empty before proceeding
    if (this.selectedSeats && this.selectedSeats.length > 0) {
      // Apply the existing selected seats setup without duplicating entries
      this.selectedSeats.forEach((seat) => {
        this.selectSeat(seat.seat, seat.type, true);
      });
    }
  }
  

  proceedToOrderSummary() {
    if (this.selectedSeats.length === 0 || this.selectedSeats.some(s => s.type === '')) {
      alert('Please select at least one seat and specify the type to proceed.');
      return;
    }

    // Loop through selectedSeats and count each type
    for (let seat of this.selectedSeats) {
      switch (seat.type) {
        case 'Child':
          this.childCount++;
          break;
        case 'Adult':
          this.adultCount++;
          break;
        case 'Senior':
          this.seniorCount++;
          break;
      }
    }

    this.router.navigate(['/order-summary'], {
      state: {
        selectedSeats: this.selectedSeats,
        movieName: this.movieName,
        movie: this.movie,
        movieId: this.movieId,
        showId: this.showId,
        show: this.show,
        childCount: this.childCount,
        adultCount: this.adultCount,
        seniorCount: this.seniorCount,
        timeString: this.timeString
      }
    });
  }
}

