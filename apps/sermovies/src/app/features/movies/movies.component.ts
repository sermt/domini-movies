import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MoviesService } from './movies.service';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from './movies-card/movie-card.component';
import { MovieRowComponent } from './movies-row/movie-row.component';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, MovieCardComponent, MovieRowComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MoviesComponent {
  private readonly moviesService = inject(MoviesService);
  readonly movies = computed(this.moviesService.movies);
  readonly isLoading = computed(this.moviesService.isLoading);
  readonly hasMorePages = computed(this.moviesService.hasMorePages);
  trendingMovies = computed(() => this.moviesService.trendingMovies());
  constructor() {
    toSignal(this.moviesService.getMovies());
    toSignal(this.moviesService.getTrendingMovies());
  }

  @HostListener('window:scroll')
  onScrolls(): void {
    if (this.isLoading() || !this.hasMorePages()) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThreshold = document.documentElement.scrollHeight;

    if (scrollPosition >= scrollThreshold) {
      this.moviesService.getMovies();
      console.log('Has llegado al final de la página');
    }
  }
}
