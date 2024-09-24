import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '@shared/models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://localhost:8080/movie/all'; // Ensure this is correct

  constructor(private http: HttpClient) {}

  // Fetch all movies
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // Fetch a movie by ID
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:8080/movie/${id}`);
  }
}





/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '@shared/models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://localhost:8080/movie';  // Spring Boot API URL

  constructor(private http: HttpClient) {}
  getAll(): Observable<Movie[]> {
    // Make sure you're returning an Observable from the HttpClient
    return this.http.get<Movie[]>(this.apiUrl);
  }
  // Method to get a movie by ID
  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }
}

*/
/*
@Injectable({
  providedIn: 'root'
})


///first code
export class MoviesService {

  //constructor() { }


  //getAll(): Movie[] {
    private movies: Movie[] =
     [
      {
        id: 1,
        name: 'The Fall Guy',
        genres: 'Action',
        imageUrl: 'assets/movienames/nowplaying/fallguy.jpg',
        category: 'Now Playing' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A stuntman, fresh off an almost career-ending accident, has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job. What could possibly go right?',
        trailerUrl: 'https://www.youtube.com/embed/j7jPnwVGdZ8',



      },
      {
        id: 2,
        name: 'Merry Christmas',
        genres: 'Thriller',
        imageUrl: '/assets/movienames/nowplaying/merrychristmas.jpg',
        category: 'Now Playing' ,
        cast: 'Katrina Kaif, Vijay Sethupathi',
        director: 'Sriram Raghavan',
        rating: 'PG-13',
        description: 'Two strangers meet on a fateful Christmas Eve. A night of delirious romance turns into a nightmare. Revealing anything more would be a crime.',
        trailerUrl: 'https://www.youtube.com/embed/nV_XVr2ZiCs'   ,
      },
      {
        id: 3,
        name: 'Mr.& Mrs. Mahi',
        genres: 'Romance',
        imageUrl:'/assets/movienames/nowplaying/Mr._&_Mrs._Mahi.jpg',
        category: 'Now Playing' ,
        cast: 'Raj Kumar Rao, Janhvi Kapoor',
        director: 'Sharan Sharma',
        rating: 'PG-13',
        description: 'Mahendra & Mahima, a couple who get together through an arranged marriage, share a common passion for Cricket. Mahendra who was once a failed local cricketer, discovers natural cricketing talent in Mahima and eventually starts coaching her to be a professional cricketer.',
        trailerUrl: 'https://www.youtube.com/embed/TtMjcP9cHIA'
        },
      {
        id: 4,
        name: 'The Inheritence',
        genres: 'Horror',
        imageUrl:'assets/movienames/nowplaying/theinheritance.jpg',
        category: 'Now Playing' ,
        cast: 'Bob Gunton, Peyton List',
        director: 'Alejandro Brugués',
        rating: 'PG-15',
        description: 'On the eve of his 75th birthday, billionaire Charles Abernathy invites his estranged children back home out of fear that tonight someone or something is going to kill him. He puts each of their inheritances on the line, to ensure they will help keep him alive.',
        trailerUrl: 'https://www.youtube.com/embed/ga3I1_dQEQU'
      },
      {
        id: 5,
        name: 'The Shift',
        genres: 'Sci-Fiction',
        imageUrl:'assets/movienames/nowplaying/THESHIFT.jpg',
        category: 'Now Playing' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A thrilling movie...',
        trailerUrl: 'https://www.youtube.com/embed/Tl7rtMiOrvY'      },
      {
        id: 6,
        name: 'Fighter',
        genres: 'Action',
        imageUrl:'assets/movienames/nowplaying/fighter.jpg',
        category: 'Now Playing' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A thrilling movie...',
        trailerUrl: 'https://www.youtube.com/embed/6amIq_mP4xM'      },
      {
        id: 7,
        name: 'Space Man',
        genres: 'Sci-Fiction',
        imageUrl:'assets/movienames/nowplaying/SPACEMAN.jpg',
        category: 'Now Playing' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A thrilling movie...',
        trailerUrl: 'https://www.youtube.com/embed/rNZ0xKaCdus'      },
      {
        id: 8,
        name: 'Outcome the wolves',
        genres: 'Thriller',
        imageUrl:'assets/movienames/nowplaying/outcomethewolves.jpg',
        category: 'Now Playing' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A thrilling movie...',
        trailerUrl: 'https://www.youtube.com/embed/Kve4hZ_DYOA'      },
      {
        id: 9,
        name: 'We Live in Time',
        genres: 'Romance',
        imageUrl:'assets/movienames/comingsoonmovies/WELIVEINTIME.jpg',
        category: 'Coming Soon' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A thrilling movie...',
        trailerUrl: 'https://www.youtube.com/embed/MH02yagHaNw'      },
      {
        id: 10,
        name: 'Rebel Ridge',
        genres: 'Action',
        imageUrl:'assets/movienames/comingsoonmovies/Rebelridge.jpg',
        category: 'Coming Soon' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A thrilling movie...',
        trailerUrl: 'https://www.youtube.com/embed/gF3gZicntIw'      },
      {
        id: 11,
        name: 'Sector-36',
        genres: 'Thriller',
        imageUrl:'assets/movienames/comingsoonmovies/sector36.jpg',
        category: 'Coming Soon' ,
        cast: 'Ryan Gosling, Emily Blunt',
        director: 'David Leitch',
        rating: 'PG-13',
        description: 'A thrilling movie...',
        trailerUrl: 'https://www.youtube.com/embed/eES65pr2POM'      },
    ];

    constructor() {}

  getAll(): Movie[] {
    return this.movies;
  }

  getById(id: number): Movie | undefined {
    return this.movies.find(movie => movie.id === id);
  }
}

*/
