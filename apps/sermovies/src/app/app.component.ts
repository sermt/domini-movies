import { Component, computed, inject, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from './features/movies/movies.service';
import { HeroComponent } from './layout/hero/hero.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeroComponent, NavbarComponent],
  standalone: true // Asegúrate de tener esta propiedad si usas standalone components
})
export class AppComponent {
  private readonly _moviesService = inject(MoviesService);
  heroMovie = computed(() => this._moviesService.selectedMovie());
  showButton = false;

  // Escuchador de eventos del scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 100;
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
