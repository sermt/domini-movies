import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, model } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { ImageService } from './../../../shared/image.service';
import { Movie } from '../../../features/movies/models/movie.model';

@Component({
  selector: 'app-search',
  imports: [DatePipe, FormsModule ],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchQuery = model<string>('');

  private readonly router = inject(Router);
  private readonly moviesService = inject(MoviesService);
  private readonly imageService = inject(ImageService);

  filteredMovies = rxResource({
    request: this.searchQuery,

    loader: () => this.moviesService.searchMovie(this.searchQuery()),
  });

  movies = linkedSignal(
    () => this.filteredMovies.value()?.results ?? ([] as Movie[])
  );

  getImageUrl(posterPath: string): string {
    return this.imageService.getImageUrl(posterPath);
  };

  goToDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }
}
