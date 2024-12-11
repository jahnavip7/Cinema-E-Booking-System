import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { MoviesService } from '../services/movies/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '@shared/models/Movie';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss'
})

export class EditMovieComponent {
  id: number = -1;
  editMovieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
    // Initialize form with form controls and validators
    this.editMovieForm = this.fb.group({
      movieName: ['', Validators.required],
      genre: ['', Validators.required],
      category: ['', Validators.required],
      cast: [''],
      director: [''],
      producers: [''],
      description: [''],
      trailerUrl: ['', Validators.required],
      imageUrl: ['', Validators.required],
      mpaaRating: ['', Validators.required],
      releaseDate: ['', Validators.required],
      duration: ['', [Validators.required, this.numberValidator]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id']; // '+' operator converts string to number
      this.id = movieId
      this.loadMovie(movieId);
    });
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') return null;  // Allow empty value if the field is not required
    return !isNaN(parseFloat(value)) && isFinite(value) ? null : { 'numberRequired': true };
  }

  loadMovie(movieId: number): void {
    this.moviesService.getMovieById(movieId).subscribe({
      next: (movie: Movie) => {
        this.editMovieForm.patchValue({
          movieName: movie.movieName,
          genre: movie.genre,
          category: movie.category,
          cast: movie.cast,
          director: movie.director,
          producers: movie.producers,
          description: movie.description,
          trailerUrl: movie.trailerUrl,
          imageUrl: movie.imageUrl,
          mpaaRating: movie.mpaaRating,
          releaseDate: movie.releaseDate,
          duration: movie.duration
        });
      },
      error: (err) => {
        alert('Error fetching movie details:' + err.message);
      }
    });
  }

  onSubmit() {
    if (this.editMovieForm.valid) {
      const formData = {...this.editMovieForm.value};
      formData.category = formData.category === 'Now Playing' ? 'NOW_PLAYING' : 'COMING_SOON';
      console.log(formData);


      this.moviesService.editMovie(formData, this.id).subscribe({
        next: () => {
          alert('Movie edited successfully!');
        },
        error: (error) => {
          alert('There was an error editing the movie.');
        }
      });
    } else {
      alert('Please fill all required fields.');
    }
  }
}