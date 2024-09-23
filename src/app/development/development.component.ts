import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductHeroComponent } from '../product-hero/product-hero.component';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [CommonModule, ProductHeroComponent],
  templateUrl: './development.component.html',
  styleUrl: './development.component.scss'
})
export class DevelopmentComponent {

}
