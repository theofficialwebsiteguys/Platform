import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-products.component.html',
  styleUrl: './feature-products.component.scss'
})
export class FeatureProductsComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() steps: { title: string, description: string }[] = [];
  @Input() buttonText: string = '';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = '';
  @Input() alignment: 'left' | 'right' = 'left'; // New input property for alignment
}
