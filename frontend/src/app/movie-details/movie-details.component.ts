import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies/movies.service';
import { Movie } from '@shared/models/Movie';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer
import { HttpErrorResponse } from '@angular/common/http';
import { SafeUrlPipe } from '../safeUrl.pipe';  // Import SafeUrlPipe

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  standalone: true,
  imports: [CommonModule, SafeUrlPipe]  // Include CommonModule to use date pipe
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;  // Initialize the movie as undefined
  trailerUrl: SafeResourceUrl | undefined; // Safe URL for the trailer

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    public sanitizer: DomSanitizer // Inject DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id']; // '+' operator converts string to number
      this.fetchMovieDetails(movieId);
    });
  }

  fetchMovieDetails(movieId: number): void {
    this.moviesService.getMovieById(movieId).subscribe({
      next: (movie: Movie) => {
        this.movie = movie;  // Movie data is fetched successfully
        console.log('Movie details:', this.movie);
        // Safely sanitize and correct the trailer URL if it's from YouTube
        if (this.movie?.trailerUrl && this.movie.trailerUrl.includes('youtube.com/watch')) {
          const videoId = this.movie.trailerUrl.split('v=')[1];
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }
}
