import { Routes } from '@angular/router';

const moviesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./movies.component'),
  },
  {
    path: ':movieId',
    loadComponent: () =>
      import('./movies-details/movie-details.component'),
  },
];

export { moviesRoutes };
