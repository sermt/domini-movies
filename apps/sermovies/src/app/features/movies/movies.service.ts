import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movie.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);

  selectedMovie = signal<Movie | null>(null);

  private readonly apiKey = '_YOUR_API_KEY_HERE_';
  private readonly baseURL = 'https://api.themoviedb.org/3';
  private readonly searchTerm = signal<string>('');
  readonly currentPage = signal(0);
  readonly hasMorePages = signal(false);
  readonly isLoading = signal(false);

  private readonly http = inject(HttpClient);

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseURL}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  private getRandomInt(min = 0, max = 50): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  setRandomMovie(): void {
    const trendingMoviesLength = this.trendingMovies().length;
    const randomIndex = this.getRandomInt(0, trendingMoviesLength);
    const randomMovie = this.trendingMovies()[randomIndex];
    this.selectedMovie.set(randomMovie);
  }

  getMovies(): Observable<MovieResponse> {
    return this.http
      .get<MovieResponse>(
        `${this.baseURL}/movie/popular?api_key=${this.apiKey}`
      )
      .pipe(
        tap((response) => {
          this.currentPage.update((currentPage) => currentPage + 1);
          this.hasMorePages.set(response.page < response.total_pages);
          this.movies.update((currentMovies) => [
            ...currentMovies,
            ...response.results,
          ]);
        })
      );
  }

  getTrendingMovies(): Observable<MovieResponse> {
    return this.http
      .get<MovieResponse>(
        `${this.baseURL}/trending/movie/day?api_key=${this.apiKey}`
      )
      .pipe(
        tap((movies: MovieResponse) => {
          this.trendingMovies.set(movies.results);
          this.setRandomMovie();
        })
      );
  }

  searchMovie(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${query}`)
  }
}
