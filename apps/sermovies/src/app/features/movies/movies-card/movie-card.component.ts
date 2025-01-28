import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Movie } from '../models/movie.model';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  imageError = false;

  private readonly _imageService = inject(ImageService);

  getImageUrl(): string {
    const posterPath = this.movie().poster_path;
    return this._imageService.getImageUrl(posterPath);
   }

  setImageError(value: boolean): void {
    this.imageError = value;
  }
 }
