import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductHeroComponent } from '../product-hero/product-hero.component';
import { FeatureBulletsComponent } from '../feature-bullets/feature-bullets.component';
import { FeatureCardsComponent } from '../feature-cards/feature-cards.component';
import { FeatureProductsComponent } from '../feature-products/feature-products.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seo-marketing',
  standalone: true,
  imports: [CommonModule, ProductHeroComponent, FeatureBulletsComponent, FeatureCardsComponent, FeatureProductsComponent, RouterModule],
  templateUrl: './seo-marketing.component.html',
  styleUrl: './seo-marketing.component.scss'
})
export class SeoMarketingComponent {

}
