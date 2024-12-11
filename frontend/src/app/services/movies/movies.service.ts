import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '@shared/models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private getAllUrl = 'http://localhost:8080/movie/all';
  private addMovieUrl = 'http://localhost:8080/api/admin/addMovie';


  constructor(private http: HttpClient) {}

  // Fetch all movies
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.getAllUrl);
  }

  // Fetch a movie by ID
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:8080/movie/${id}`);
  }


  addMovie(movieData: any): Observable<any> {
    return this.http.post<any>(this.addMovieUrl, movieData);
  }

  editMovie(movieData: any, id: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/admin/editMovies/${id}`, movieData);
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/admin/movies/${movieId}`);
  }

  scheduleMovie(movieId: number, theaterId: number, date: string, time: string, token: string): Observable<string> {
    const url = 'http://localhost:8080/api/admin/scheduleMovies';
    // Create HttpParams
    let params = new HttpParams()
      .set('movieId', movieId.toString())
      .set('theaterId', theaterId.toString())
      .set('date', date)
      .set('time', time);

    // Prepare headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const emptyPayload = {

    };

    // Make the HTTP request
    return this.http.post<string>(url, emptyPayload, { headers: headers, params: params });

  }


  getShowtimes(movieId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/shows/movie/${movieId}`);
  }
}