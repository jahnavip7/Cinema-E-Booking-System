// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-manage-movies',
//   standalone: true,
//   imports: [],
//   templateUrl: './manage-movies.component.html',
//   styleUrl: './manage-movies.component.scss'
// })
// export class ManageMoviesComponent {

// }
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies/movies.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-movies.component.html',
  styleUrl: './manage-movies.component.scss'
})
export class ManageMoviesComponent implements OnInit {
  movies: any[] = [];
  selectedMovieId: any = null;

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.moviesService.getMovies().subscribe({
      next: (data) => {
        console.log(data);
        this.movies = data;
        if (data.length > 0) {
          this.selectedMovieId = data[0].id;  // Set default selected movie ID
          this.onMovieSelection({ target: { value: this.selectedMovieId } });  // Simulate initial selection
        }
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  onEdit(): void {
    if (this.selectedMovieId) {
      this.router.navigate(['/edit-movie/' + this.selectedMovieId]);
    } else {
      alert('Please select a movie.');
    }
  }

  onSchedule() {
    if (this.selectedMovieId) {
      this.router.navigate(['/schedule-movie/' + this.selectedMovieId]);
    } else {
      alert('Please select a movie.');
    }
  }

  onAdd() {
    this.router.navigate(['/add-movie']);
  }

  onDelete(): void {
    if (this.selectedMovieId) {
      this.moviesService.deleteMovie(this.selectedMovieId).subscribe({
        next: () => {
          // Optionally remove the movie from 'movies' array or refresh the list
          alert('Movie deleted successfully');
          this.fetchMovies();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting movie:', error);
          window.location.reload();
        }
      });
    }
  }

  onMovieSelection(event: any): void {
    this.selectedMovieId = event.target.value;
    // console.log(this.selectedMovieId);
  }
}

