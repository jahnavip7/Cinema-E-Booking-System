// import { Component, OnInit } from '@angular/core';
// import { MoviesService } from '../services/movies/movies.service'; // Adjust the path if necessary
// import { Movie } from '@shared/models/Movie'; // Adjust the path if necessary
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
// import { AuthService } from '../services/auth/auth.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule]
// })
// export class HomeComponent implements OnInit {
//   nowPlayingMovies: Movie[] = [];
//   comingSoonMovies: Movie[] = [];
//   filteredNowPlayingMovies: Movie[] = [];
//   filteredComingSoonMovies: Movie[] = [];
//   searchTerm: string = '';

//   constructor(private moviesService: MoviesService, public authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     this.fetchMovies();
//   }

//   fetchMovies(): void {
//     this.moviesService.getMovies().subscribe((movies) => {
//       this.nowPlayingMovies = movies.filter(movie => movie.category === 'NOW_PLAYING');
//       this.comingSoonMovies = movies.filter(movie => movie.category === 'COMING_SOON');

//       // Initially set filtered movies as full movie list
//       this.filteredNowPlayingMovies = [...this.nowPlayingMovies];
//       this.filteredComingSoonMovies = [...this.comingSoonMovies];
//     });
//   }

//   filterMovies(): void {
//     const searchTermLower = this.searchTerm.toLowerCase();

//     // Filter Now Playing movies
//     this.filteredNowPlayingMovies = this.nowPlayingMovies.filter(movie =>
//       movie.movieName.toLowerCase().includes(searchTermLower)
//     );

//     // Filter Coming Soon movies
//     this.filteredComingSoonMovies = this.comingSoonMovies.filter(movie =>
//       movie.movieName.toLowerCase().includes(searchTermLower)
//     );
//   }

//   bookMovie(movieId: number) {
//     if (this.authService.isAuthenticated()) {
//       console.log(this.authService.isAuthenticated());
//       this.router.navigate(['/book', movieId]);
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies/movies.service'; // Adjust the path if necessary
import { Movie } from '@shared/models/Movie'; // Adjust the path if necessary
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: Movie[] = [];
  comingSoonMovies: Movie[] = [];
  filteredNowPlayingMovies: Movie[] = [];
  filteredComingSoonMovies: Movie[] = [];
  searchTerm: string = '';
  searchType: 'title' | 'genre' = 'title';

  constructor(private moviesService: MoviesService, public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.moviesService.getMovies().subscribe((movies) => {
      this.nowPlayingMovies = movies.filter(movie => movie.category === 'NOW_PLAYING');
      this.comingSoonMovies = movies.filter(movie => movie.category === 'COMING_SOON');

      // Initially set filtered movies as full movie list
      this.filteredNowPlayingMovies = [...this.nowPlayingMovies];
      this.filteredComingSoonMovies = [...this.comingSoonMovies];
    });
  }

  searchByTitle(): void {
    this.searchType = 'title'; // Set search type to 'title'

    const searchTermLower = this.searchTerm.toLowerCase();

    // Filter Now Playing movies by title
    this.filteredNowPlayingMovies = this.nowPlayingMovies.filter(movie =>
      movie.movieName.toLowerCase().includes(searchTermLower)
    );

    // Filter Coming Soon movies by title
    this.filteredComingSoonMovies = this.comingSoonMovies.filter(movie =>
      movie.movieName.toLowerCase().includes(searchTermLower)
    );
  }

  searchByGenre(): void {
    this.searchType = 'genre'; // Set search type to 'genre'

    const searchTermLower = this.searchTerm.toLowerCase();

    // Filter Now Playing movies by genre
    this.filteredNowPlayingMovies = this.nowPlayingMovies.filter(movie =>
      movie.genre.toLowerCase().includes(searchTermLower)
    );

    // Filter Coming Soon movies by genre
    this.filteredComingSoonMovies = this.comingSoonMovies.filter(movie =>
      movie.genre.toLowerCase().includes(searchTermLower)
    );
  }

  clearSearch() {
    this.searchTerm = "";
    this.filteredNowPlayingMovies = [...this.nowPlayingMovies];
    this.filteredComingSoonMovies = [...this.comingSoonMovies];
  }

  bookMovie(movieId: number) {
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.isAuthenticated());
      this.router.navigate(['/book', movieId]);
    }
  }
}