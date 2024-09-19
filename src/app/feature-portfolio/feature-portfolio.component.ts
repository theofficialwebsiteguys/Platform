import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-portfolio.component.html',
  styleUrl: './feature-portfolio.component.scss'
})
export class FeaturePortfolioComponent {
  isHover = false;

  onMouseEnter() {
    this.isHover = true;
  }

  onMouseLeave() {
    this.isHover = false;
  }
}
