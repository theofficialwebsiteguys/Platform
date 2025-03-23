import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FeaturePortfolioComponent } from './feature-portfolio/feature-portfolio.component';
import { FeatureStepsComponent } from './feature-steps/feature-steps.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { FeatureProductsComponent } from './feature-products/feature-products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, FeatureStepsComponent, HeroComponent, FooterComponent, FeatureProductsComponent, FeaturePortfolioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'platform-frontend';

  constructor(private router: Router) {}

  onActivate(event: any) {
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
 }

 isPlatformRoute(): boolean {
  return this.router.url.startsWith('/platform');
}

}
