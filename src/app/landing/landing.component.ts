import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeatureProductsComponent } from '../feature-products/feature-products.component';
import { FeatureStepsComponent } from '../feature-steps/feature-steps.component';
import { FeaturePortfolioComponent } from '../feature-portfolio/feature-portfolio.component';
import { Feature3Component } from '../feature-3/feature-3.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, HeroComponent, FeatureProductsComponent, FeatureStepsComponent, FeaturePortfolioComponent, Feature3Component],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
