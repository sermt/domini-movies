import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movie.model';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  movie = input.required<Movie>();
}
