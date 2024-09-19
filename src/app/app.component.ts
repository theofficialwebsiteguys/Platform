import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FeatureStepsComponent } from './feature-steps/feature-steps.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { FeatureProductsComponent } from './feature-products/feature-products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FeatureStepsComponent, HeroComponent, FooterComponent, FeatureProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'platform-frontend';
}
