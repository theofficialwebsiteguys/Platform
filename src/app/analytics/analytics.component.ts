import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductHeroComponent } from '../product-hero/product-hero.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ProductHeroComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

}
