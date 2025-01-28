import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { }
