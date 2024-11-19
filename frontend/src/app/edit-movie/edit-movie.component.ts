// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-edit-movie',
//   standalone: true,
//   imports: [],
//   templateUrl: './edit-movie.component.html',
//   styleUrl: './edit-movie.component.scss'
// })
// export class EditMovieComponent {

// }
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
      producer: [''],
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
          producer: movie.producer,
          description: movie.description,
          trailerUrl: movie.trailerUrl,
          imageUrl: movie.imageUrl,
          mpaaRating: movie.mpaaRating,
          releaseDate: movie.releaseDate,
          duration: movie.duration
        });
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }

  onSubmit() {
    // if (this.addMovieForm.valid) {
    //   const formData = {...this.addMovieForm.value};
    //   formData.category = formData.category === 'Now Playing' ? 'NOW_PLAYING' : 'COMING_SOON';
    //   console.log(formData);


    //   // this.moviesService.addMovie(formData).subscribe({
    //   //   next: () => {
    //   //     alert('Movie added successfully!');
    //   //   },
    //   //   error: (error) => {
    //   //     console.error('Error adding movie:', error);
    //   //     alert('There was an error adding the movie.');
    //   //   }
    //   // });
    // } else {
    //   alert('Please fill all required fields.');
    // }
  }
}