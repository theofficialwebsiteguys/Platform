import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductHeroComponent } from '../product-hero/product-hero.component';
import { FeatureBulletsComponent } from '../feature-bullets/feature-bullets.component';
import { FeatureCardsComponent } from '../feature-cards/feature-cards.component';
import { FeatureProductsComponent } from '../feature-products/feature-products.component';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [CommonModule, ProductHeroComponent, FeatureProductsComponent, FeatureBulletsComponent, FeatureCardsComponent],
  templateUrl: './development.component.html',
  styleUrl: './development.component.scss'
})
export class DevelopmentComponent {

}
