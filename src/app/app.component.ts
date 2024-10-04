import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FeaturePortfolioComponent } from './feature-portfolio/feature-portfolio.component';
import { FeatureStepsComponent } from './feature-steps/feature-steps.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { FeatureProductsComponent } from './feature-products/feature-products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FeatureStepsComponent, HeroComponent, FooterComponent, FeatureProductsComponent, FeaturePortfolioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'platform-frontend';

  onActivate(event: any) {
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
 }
}
