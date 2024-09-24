import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductHeroComponent } from '../product-hero/product-hero.component';
import { FeatureProductsComponent } from '../feature-products/feature-products.component';
import { FeatureBulletsComponent } from '../feature-bullets/feature-bullets.component';
import { FeatureCardsComponent } from '../feature-cards/feature-cards.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ProductHeroComponent, FeatureProductsComponent, FeatureBulletsComponent, FeatureCardsComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

}
