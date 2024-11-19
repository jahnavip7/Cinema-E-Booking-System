import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  selectedShowtime: any;  // Changed to any to hold the full object
  showId: number = 0;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

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
            console.log(data);
            this.showtimes = data.map(show => ({
              id: show.showId,
              theaterId: show.theaterId,
              date: show.date,
              time: show.time,
              display: `${this.movieName}, Auditorium '${show.theaterId}', ${show.date}, ${show.time}`
            }));
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

  onShowtimeChange() {
    this.showId = this.selectedShowtime.id; 
  }

  onNext(){
    console.log(this.selectedShowtime);
  }

}
