import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ImageService } from '../../../shared/image.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-row',
  imports: [],
  templateUrl: './movie-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieRowComponent {
  title = input<string>('Trending')
  movies = input.required<Movie[]>()

  private readonly imageService = inject(ImageService);


  getImageUrl(posterPath: string): string {
    return this.imageService.getImageUrl(posterPath);
  }

 }
