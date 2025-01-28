
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-details',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './movie-details.component.html',
})
export default class MovieDetailsComponent {
  // movieId = this.route.snapshot.params['movieId'];
  movieId = input.required<string>();

  private readonly router = inject(Router);
  private readonly movieService = inject(MoviesService);
  private readonly imageService = inject(ImageService);


  movie = rxResource({
    request: this.movieId,
    loader: ()=> this.movieService.getMovieById(this.movieId())
  })

  goBack(): void{
    this.router.navigate(['..'])
  };

  getImageUrl(posterPath:string | null):string {
    return this.imageService.getImageUrl(posterPath);
  }
}
