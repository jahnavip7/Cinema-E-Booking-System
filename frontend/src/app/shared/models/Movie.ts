export interface Movie {
  id: number;
  movieName: string;
  duration: number;
  rating: number;
  releaseDate: string;
  description: string;
  imageUrl: string;
  trailerUrl: string;
  cast: string;
  director: string;
  genre: string;
  category: string;
  language: string;
  shows: any[]; // Assuming shows is an array, adjust as needed
}
