// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-movie',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-movie.component.html',
//   styleUrl: './add-movie.component.scss'
// })
// export class AddMovieComponent {

// }
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { MoviesService } from '../services/movies/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss'
})

export class AddMovieComponent {
  addMovieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private router: Router
  ) {
    // Initialize form with form controls and validators
    this.addMovieForm = this.fb.group({
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

  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') return null;  // Allow empty value if the field is not required
    return !isNaN(parseFloat(value)) && isFinite(value) ? null : { 'numberRequired': true };
  }

  onSubmit() {
    if (this.addMovieForm.valid) {
      const formData = {...this.addMovieForm.value};
      formData.category = formData.category === 'Now Playing' ? 'NOW_PLAYING' : 'COMING_SOON';
      console.log(formData);


      this.moviesService.addMovie(formData).subscribe({
        next: () => {
          alert('Movie added successfully!');
        },
        error: (error) => {
          console.error('Error adding movie:', error);
          alert('There was an error adding the movie.');
        }
      });
    } else {
      alert('Please fill all required fields.');
    }
  }
}
