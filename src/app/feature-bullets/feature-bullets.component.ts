import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-bullets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-bullets.component.html',
  styleUrl: './feature-bullets.component.scss'
})
export class FeatureBulletsComponent {
  @Input() features: { icon: string, title: string, description: string }[] = [];
}
