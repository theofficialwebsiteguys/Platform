import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductHeroComponent } from '../product-hero/product-hero.component';

@Component({
  selector: 'app-seo-marketing',
  standalone: true,
  imports: [CommonModule, ProductHeroComponent],
  templateUrl: './seo-marketing.component.html',
  styleUrl: './seo-marketing.component.scss'
})
export class SeoMarketingComponent {

}
