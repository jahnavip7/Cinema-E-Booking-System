import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MoviesService } from '../services/movies/movies.service';
import { Movie } from '@shared/models/Movie';


@Component({
  selector: 'app-select-showtime',
  templateUrl: './select-showtime.component.html',
  styleUrls: ['./select-showtime.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SelectShowtimeComponent {
  movie: any;
  movieId: number = 0;
  movieName: string = '';
  showtimes: any[] = [];
  selectedShowtime: any;
  showId: number = 0;
  timeString: string = '';
  selectedSeats: { seatNumber: string, category: string, price: number, seatStatus: string}[] = [];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedShowtime = navigation.extras.state['show'];
      this.showId = navigation.extras.state['showId'];
      this.selectedSeats = navigation.extras.state['selectedSeats'];
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id']; // '+' operator converts string to number
    });


    this.moviesService.getMovieById(this.movieId).subscribe({
      next: (movie: Movie) => {
        this.movie = movie;
        this.movieName = movie.movieName;
        this.moviesService.getShowtimes(this.movieId).subscribe({
          next: (data) => {
            this.showtimes = data.map(show => ({
              id: show.showId,
              theaterName: show.theaterName,
              theaterId: show.theaterId,
              date: show.date,
              time: show.time,
              display: `${this.movieName}, ${show.theaterName}, ${show.date}, ${show.time}`
            }));

            if (this.showId != 0) this.selectedShowtime = this.showtimes.find(st => st.id === this.showId);
          },
          error: (err) => {
            alert("Error:" + err.error);
            console.error('Error fetching showtimes:', err)
          }
        });
      },
      error: (err) => {
        alert("Error:" + err.error);
        console.error('Error fetching movie details:', err);
      }
    });
    
  }

  getTime(show: any) {
    if (show.time === '9:00:00') this.timeString = '9 AM';
    else if (show.time === '12:00:00') this.timeString = '12 PM';
    else if (show.time === '15:00:00') this.timeString = '3 PM';
    else if (show.time === '18:00:00') this.timeString = '6 PM';
    else if (show.time === '21:00:00') this.timeString = '9 PM';
    else this.timeString = 'No time available!';
  }

  onShowtimeChange() {
    this.showId = this.selectedShowtime.id;
    this.selectedSeats = [];
  }

  onNext(){
    this.getTime(this.selectedShowtime);
    this.router.navigate(['/select-seat'], {
      state: {
        movie: this.movie,
        movieId: this.movieId,
        movieName: this.movieName,
        show: this.selectedShowtime,
        showId: this.showId,
        timeString: this.timeString,
        selectedSeats: this.selectedSeats
      }
    });
  }

}
